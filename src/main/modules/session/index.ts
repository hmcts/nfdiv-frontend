import config from 'config';
import ConnectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import session from 'express-session';
import * as redis from 'redis';
import FileStoreFactory from 'session-file-store';

const RedisStore = ConnectRedis(session);
const FileStore = FileStoreFactory(session);

export const cookieMaxAge = 21 * (60 * 1000); // 21 minutes

export class SessionStorage {
  public async enableFor(app: Application): Promise<void> {
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
        store: await this.getStore(app),
      })
    );
  }

  private async getStore(app: Application) {
    const redisHost = config.get<string>('session.redis.host');
    if (redisHost) {
      const client = redis.createClient({
        url: 'redis://' + redisHost + ':6380',
        password: config.get<string>('session.redis.key'),
      });

      await client.connect();

      app.locals.redisClient = client;
      return new RedisStore({ client });
    }

    return new FileStore({ path: '/tmp' });
  }
}
