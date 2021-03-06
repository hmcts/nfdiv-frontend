import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { getCaseApi } from '../../app/case/CaseApi';
import { AppRequest } from '../../app/controller/AppRequest';
import {
  APPLICANT_2,
  APPLICANT_2_CALLBACK_URL,
  APPLICANT_2_SIGN_IN_URL,
  CALLBACK_URL,
  ENTER_YOUR_ACCESS_CODE,
  SIGN_IN_URL,
  SIGN_OUT_URL,
} from '../../steps/urls';

/**
 * Adds the oidc middleware to add oauth authentication
 */
export class OidcMiddleware {
  public enableFor(app: Application): void {
    const protocol = app.locals.developmentMode ? 'http://' : 'https://';
    const port = app.locals.developmentMode ? `:${config.get('port')}` : '';
    const { errorHandler } = app.locals;

    app.get(SIGN_IN_URL, (req, res) =>
      res.redirect(getRedirectUrl(`${protocol}${res.locals.host}${port}`, CALLBACK_URL))
    );
    app.get(APPLICANT_2_SIGN_IN_URL, (req, res) =>
      res.redirect(getRedirectUrl(`${protocol}${res.locals.host}${port}`, APPLICANT_2_CALLBACK_URL))
    );
    app.get(SIGN_OUT_URL, (req, res) => req.session.destroy(() => res.redirect('/')));
    app.get(
      CALLBACK_URL,
      errorHandler(async (req, res) => {
        if (typeof req.query.code === 'string') {
          req.session.user = await getUserDetails(`${protocol}${res.locals.host}${port}`, req.query.code, CALLBACK_URL);
          req.session.save(() => res.redirect('/'));
        } else {
          res.redirect(SIGN_IN_URL);
        }
      })
    );
    app.get(
      APPLICANT_2_CALLBACK_URL,
      errorHandler(async (req, res) => {
        if (typeof req.query.code === 'string') {
          req.session.user = await getUserDetails(
            `${protocol}${res.locals.host}${port}`,
            req.query.code,
            APPLICANT_2_CALLBACK_URL
          );
          req.session.save(() => res.redirect(`${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`));
        } else {
          res.redirect(APPLICANT_2_SIGN_IN_URL);
        }
      })
    );

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if (req.session?.user) {
          res.locals.isLoggedIn = true;
          req.locals.api = getCaseApi(req.session.user, req.locals.logger);

          if (!req.path.endsWith(ENTER_YOUR_ACCESS_CODE)) {
            req.session.userCase =
              req.session.userCase || (await req.locals.api.getOrCreateCase(res.locals.serviceType, req.session.user));
            req.session.isApplicant2 =
              req.session.isApplicant2 ||
              (await req.locals.api.isApplicant2(req.session.userCase.id, req.session.user.id));
          }

          return next();
        } else if (req.url === APPLICANT_2) {
          res.redirect(APPLICANT_2_SIGN_IN_URL);
        } else {
          res.redirect(SIGN_IN_URL);
        }
      })
    );
  }
}
