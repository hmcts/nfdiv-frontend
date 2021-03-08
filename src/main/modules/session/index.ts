import config from 'config';
import ConnectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import session from 'express-session';
import * as redis from 'redis';
import FileStoreFactory from 'session-file-store';

const RedisStore = ConnectRedis(session);
const FileStore = FileStoreFactory(session);

export class SessionStorage {
  public enableFor(app: Application): void {
    app.use(cookieParser());

    app.use(
      session({
        name: 'nfdiv-session',
        resave: false,
        saveUninitialized: false,
        secret: config.get('session.secret'),
        cookie: {
          httpOnly: true,
          maxAge: 21 * (60 * 1000), // 21 minutes
        },
        rolling: true, // Renew the cookie for another 20 minutes on each request
        store: this.getStore(),
      })
    );
  }

  private getStore() {
    return !config.get('session.redis.host')
      ? new FileStore({ path: '/tmp' })
      : new RedisStore({
          client: redis.createClient({
            host: config.get('session.redis.host') as string,
            password: config.get('session.redis.key') as string,
            port: 6380,
            tls: true,
            connect_timeout: 5000,
          }),
        });
  }
}
