import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { CALLBACK_URL, getCaseApi, getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { AppRequest } from '../../app/controller/AppRequest';
import { SAVE_SIGN_OUT_URL, SIGN_IN_URL, SIGN_OUT_URL } from '../../steps/urls';

/**
 * Adds the oidc middleware to add oauth authentication
 */
export class OidcMiddleware {
  public enableFor(app: Application): void {
    const protocol = app.locals.developmentMode ? 'http://' : 'https://';
    const port = app.locals.developmentMode ? `:${config.get('port')}` : '';
    const { errorHandler } = app.locals;

    app.get(SIGN_IN_URL, (req, res) => res.redirect(getRedirectUrl(`${protocol}${res.locals.host}${port}`)));
    app.get(SIGN_OUT_URL, (req, res) => req.session.destroy(() => res.redirect('/')));
    app.get(
      CALLBACK_URL,
      errorHandler(async (req, res) => {
        req.session.user = await getUserDetails(`${protocol}${res.locals.host}${port}`, req.query.code as string);
        req.session.save(() => res.redirect('/'));
      })
    );

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if (req.session.user) {
          res.locals.isLoggedIn = true;
          req.locals.api = getCaseApi(req.session.user.accessToken, req.locals.logger);
          req.session.userCase = req.session.userCase || (await req.locals.api.getOrCreateCase(res.locals.serviceType));

          return next();
        } else if (req.originalUrl !== SAVE_SIGN_OUT_URL) {
          res.redirect(SIGN_IN_URL);
        } else {
          return next();
        }
      })
    );
  }
}
