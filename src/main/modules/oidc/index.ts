import { AwilixContainer, asClass, asValue } from 'awilix';
import Axios from 'axios';
import config from 'config';
import { Application, NextFunction, Request, Response } from 'express';
import jwt_decode from 'jwt-decode';

import { CosApi } from '../../app/api/CosApi';
import { AppRequest } from '../../app/controller/AppRequest';
import { SIGN_IN_URL, SIGN_OUT_URL } from '../../steps/urls';

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

    app.get(
      SIGN_IN_URL,
      errorHandler((req: AppRequest, res) => {
        const redirectUri = encodeURI(`${protocol}${res.locals.host}${port}/oauth2/callback`);
        res.redirect(`${loginUrl}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`);
      })
    );

    app.get(
      '/oauth2/callback',
      errorHandler(async (req: AppRequest, res: Response) => {
        const redirectUri = encodeURI(`${protocol}${res.locals.host}${port}/oauth2/callback`);
        const response = await Axios.post(
          tokenUrl,
          `client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&redirect_uri=${redirectUri}&code=${encodeURIComponent(
            req.query.code as string
          )}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        req.session.user = {
          ...response.data,
          jwt: jwt_decode(response.data.id_token),
        };
        req.session.save(() => res.redirect('/'));
      })
    );

    app.get(
      SIGN_OUT_URL,
      errorHandler((req: AppRequest, res) => {
        delete req.session.user;
        delete req.session.userCase;
        delete req.session.lang;
        req.session.state = {};
        req.session.save(() => res.redirect('/'));
      })
    );

    app.use(
      errorHandler(async (req: RequestWithScope, res: Response, next: NextFunction) => {
        if (req.session?.user) {
          const user = req.session.user;
          req.scope = req.app.locals.container.createScope();
          req.scope?.register({
            axios: asValue(
              Axios.create({
                baseURL: config.get('services.cos.baseURL'),
                headers: {
                  Authorization: 'Bearer ' + user.access_token,
                  IdToken: user.id_token,
                },
              })
            ),
            api: asClass(CosApi),
          });

          if (!req.session.userCase) {
            const userCase = await req.scope?.cradle.api.getCase();
            req.session.userCase =
              userCase || (await req.scope?.cradle.api.createCase({ divorceOrDissolution: res.locals.serviceType }));
          }

          res.locals.isLoggedIn = true;
          return next();
        }
        res.redirect(SIGN_IN_URL);
      })
    );
  }
}

declare module 'express-session' {
  export interface SessionData {
    user: Record<string, Record<string, unknown>> | undefined;
    userCase: Record<string, string> | undefined;
  }
}

export interface RequestWithScope extends Request {
  scope?: AwilixContainer;
}
