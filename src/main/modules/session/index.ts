import config from 'config';
import ConnectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import session from 'express-session';
import FileStoreFactory from 'session-file-store';

const { createClient } = require('redis');

const RedisStore = ConnectRedis(session);
const FileStore = FileStoreFactory(session);

export const cookieMaxAge = 21 * (60 * 1000); // 21 minutes

export class SessionStorage {
  public enableFor(app: Application): void {
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
          maxAge: cookieMaxAge,
          sameSite: 'lax', // required for the oauth2 redirect
          secure: !app.locals.developmentMode,
        },
        rolling: true, // Renew the cookie for another 20 minutes on each request
        store: SessionStorage.getStore(app),
      })
    );
  }

  private static getStore(app: Application) {
    const redisHost = config.get('session.redis.host');
    if (redisHost) {
      const redisClient = createClient({
        legacyMode: true,
        socket: {
          host: redisHost as string,
          port: 6380,
          tls: true,
          connectTimeout: 15000,
        },
        password: config.get('session.redis.key') as string,
      });

      app.locals.redisClient = redisClient;
      return new RedisStore({ client: redisClient });
    }

    return new FileStore({ path: '/tmp' });
  }
}
