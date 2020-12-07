import { Application } from 'express';
import session from 'express-session';
import ConnectRedis from 'connect-redis';
import * as redis from 'redis';
import config from 'config';
import FileStoreFactory from 'session-file-store';
import { SessionStateStorage } from '../../app/step/SessionStateStorage';
import { AppSession } from '../../app/controller/AppRequest';

const RedisStore = ConnectRedis(session);
const FileStore = FileStoreFactory(session);

export class SessionStorage {

  public enableFor(server: Application) {
    server.use(session({
      name: 'nfdiv-session',
      resave: false,
      saveUninitialized: false,
      secret: config.get('session.secret'),
      cookie: {
        httpOnly: true,
        sameSite: true
      },
      store: this.getStore()
    }));

    server.use((req, res, next) => {
      const session = req.session as AppSession;
      session.state = session.state || {};
      res.locals.storage = new SessionStateStorage(session);

      next();
    });
  }

  private getStore() {
    return !config.get('session.redis.host')
      ? new FileStore({ path: '/tmp' })
      : new RedisStore({
        client: redis.createClient({
          host: config.get('session.redis.host') as string,
          password: config.get('session.redis.key') as string,
          port: 6380,
          tls: true
        })
      });
  }
}
