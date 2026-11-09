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
      hostname: url.hostname,
      port: url.port,
      user: url.username,
      password: url.password,
      protocol: url.protocol,
    };

    if (!managedRedisConfig.hostname) {
      logger.info('No Redis host configured, using file store for redis');
      return new FileStore({ path: '/tmp' });
    }

    const isManagedRedisCache = managedRedisConfig.hostname.includes('azure.net');

    logger.info(
      `Redis connection - Host: ${managedRedisConfig.hostname}, Port: ${managedRedisConfig.port || managedRedisConfig.port}, Protocol: ${managedRedisConfig.protocol}`
    );

    const client = isManagedRedisCache
      ? redis.createCluster({
          rootNodes: [
            {
              url: connectionString,
            },
          ],
          defaults: {
            password: decodeURIComponent(managedRedisConfig.password),
            socket: {
              tls: true,
              servername: managedRedisConfig.hostname,
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
        logger.info('Failed to connect to Redis cluster:', err.message);
      });

    app.locals.redisClient = client;
    return new RedisStore({ client });
  }
}
