import {Application, NextFunction, Request, Response} from 'express';
import Axios from 'axios';
import config from 'config';
import jwt_decode from 'jwt-decode';
import { asClass, asValue, AwilixContainer } from 'awilix';
import { COSApi } from '../api/cos-api';

/**
 * Adds the oidc middleware to add oauth authentication
 */
export class OidcMiddleware {

  public enableFor(app: Application): void {
    const loginUrl: string = config.get('services.idam.authorizationURL');
    const tokenUrl: string = config.get('services.idam.tokenURL');
    const clientId: string = config.get('services.idam.clientID');
    const clientSecret: string = config.get('services.idam.clientSecret');
    const protocol = app.locals.developmentMode ? 'http://' : 'https://';
    const port = app.locals.developmentMode ? `:${config.get('port')}` : '';
    const { errorHandler } = app.locals;

    app.get('/login', errorHandler((req: Request, res) => {
      const redirectUri = encodeURI(`${protocol}${req.hostname}${port}/oauth2/callback`);
      res.redirect(`${loginUrl}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`);
    }));

    app.get('/oauth2/callback', errorHandler(async (req: Request, res: Response) => {
      const redirectUri = encodeURI(`${protocol}${req.hostname}${port}/oauth2/callback`);
      const response = await Axios.post(
        tokenUrl,
        `client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&redirect_uri=${redirectUri}&code=${encodeURIComponent(req.query.code as string)}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      req.session.user = {
        ...response.data,
        jwt: jwt_decode(response.data.id_token)
      };
      req.session.save(() => res.redirect('/'));
    }));

    app.get('/logout', errorHandler((req: Request, res) => {
      req.session.user = undefined;
      req.session.save(() => res.redirect('/'));
    }));

    app.use(async (req: Request, res: Response, next: NextFunction) => {
      if (req.session?.user) {
        const user = req.session.user;
        req.scope = req.app.locals.container.createScope();
        req.scope?.register({
          axios: asValue(Axios.create({
            baseURL: config.get('services.cos.baseURL'),
            headers: {
              Authorization: 'Bearer ' + user.id_token
            }
          })),
          api: asClass(COSApi)
        });

        if (!req.session.caseCreated) {
          req.session.caseCreated = await req.scope?.cradle.api.createCase({ petitionerEmail: user.jwt.sub });
        }

        res.locals.isLoggedIn = true;
        return next();
      }
      res.redirect('/login');
    });
  }
}

declare module 'express-session' {
  export interface SessionData {
    user: Record<string, Record<string, unknown>>,
    caseCreated: boolean
  }
}

declare module 'Express' {
  export interface Request {
    scope?: AwilixContainer
  }
}
