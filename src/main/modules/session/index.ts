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
        store: this.getStore(app),
      })
    );
  }

  private getStore(app: Application) {
    const redisHost = config.get('session.redis.host');
    if (redisHost) {
      const redisClient = createClient({
        socket: {
          host: redisHost as string,
          port: config.get('session.redis.port'),
          tls: config.get('session.redis.tls'),
          connectTimeout: config.get('session.redis.connectionTimeout'),
        },
        password: config.get('session.redis.key') as string,
      });

      redisClient.connect().then(() => {
        app.locals.redisClient = redisClient;
        return new RedisStore({ client: redisClient });
      });
    }

    return new FileStore({ path: '/tmp' });
  }
}
