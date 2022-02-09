import config from 'config';
import ConnectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import session from 'express-session';
import * as redis from 'redis';
import FileStoreFactory from 'session-file-store';
import { LoggerInstance } from 'winston';

const RedisStore = ConnectRedis(session);
const FileStore = FileStoreFactory(session);

export const cookieMaxAge = 21 * (60 * 1000); // 21 minutes

export class SessionStorage {
  public enableFor(app: Application, logger: LoggerInstance): void {
    app.use(cookieParser());

    app.use(
      session({
        name: 'nfdiv-session',
        resave: false,
        saveUninitialized: false,
        secret: config.get('session.secret'),
        cookie: {
          httpOnly: true,
          maxAge: cookieMaxAge,
        },
        rolling: true, // Renew the cookie for another 20 minutes on each request
        store: this.getStore(app, logger),
      })
    );
  }

  private getStore(app: Application, logger: LoggerInstance) {
    const redisHost = config.get('session.redis.host');
    if (redisHost) {
      const client = redis.createClient({
        legacyMode: true,
        socket: {
          host: redisHost as string,
          port: 6380,
          tls: true,
          connectTimeout: 20000,
          keepAlive: 5000,
        },
        password: config.get('session.redis.key') as string,
      });
      client
        .connect()
        .then(() => client.set('live', 'true'))
        .catch(logger.error);

      setInterval(() => logger.info(client.get('live') + ''), 5000);
      app.locals.redisClient = client;
      return new RedisStore({ client });
    }

    return new FileStore({ path: '/tmp' });
  }
}
