import { Logger } from '@hmcts/nodejs-logging';
import config from 'config';
import RedisStore from 'connect-redis';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import session from 'express-session';
import * as redis from 'redis';
import FileStoreFactory from 'session-file-store';

const FileStore = FileStoreFactory(session);

export class SessionStorage {
  public enableFor(app: Application, logger: Logger): void {
    app.use(cookieParser());
    app.set('trust proxy', 1);

    app.use(
      session({
        name: 'nfdiv-session',
        resave: false,
        saveUninitialized: false,
        secret: config.get('session.secret'),
        cookie: {
          httpOnly: true,
          maxAge: config.get('session.maxAge'),
          sameSite: 'lax', // required for the oauth2 redirect
          secure: !app.locals.developmentMode,
        },
        rolling: true, // Renew the cookie for another 20 minutes on each request
        store: this.getStore(app, logger),
      })
    );
  }

  private getStore(app: Application, logger: Logger) {
    const redisHost = config.get('session.redis.host') as string;
    const redisPort = config.get('session.redis.port') as number;
    const redisKey = config.get('session.redis.key') as string;
    const connectionString = config.get('session.redis.connectionString') as string;
    const url = new URL(connectionString);

    const managedRedisConfig = {
      host: url.hostname,
      port: url.port,
      user: url.username,
      password: url.password,
    };

    if (!managedRedisConfig.host) {
      logger.info('No Redis host configured, using file store for redis');
      return new FileStore({ path: '/tmp' });
    }

    const isManagedRedisCache = managedRedisConfig.host.includes('azure.net');

    const DEFAULT_REDIS_PORT = 10000;

    logger.info(
      `Redis connection - Host: ${url.hostname}, Port: ${url.port || DEFAULT_REDIS_PORT}, Protocol: ${url.protocol}`
    );

    const client = isManagedRedisCache
      ? redis.createCluster({
          rootNodes: [
            {
              url: connectionString, // e.g., 'rediss://default:PASSWORD@host:10000'
            },
          ],
          defaults: {
            socket: {
              tls: true,
              rejectUnauthorized: true,
              connectTimeout: 30000,
            },
          },
        })
      : redis.createClient({
          socket: {
            host: redisHost as string,
            port: redisPort as number,
            connectTimeout: 15000,
            tls: true,
          },
          password: redisKey,
        });

    client
      .connect()
      .then(() => {
        logger.info('Redis cluster connection established successfully');
      })
      .catch(err => {
        logger.error('Failed to connect to Redis cluster:', err.message);
      });

    app.locals.redisClient = client;
    return new RedisStore({ client });
  }
}
