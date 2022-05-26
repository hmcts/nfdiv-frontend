import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { InProgressDivorceCase, getCaseApi } from '../../app/case/case-api';
import { AppRequest } from '../../app/controller/AppRequest';
import {
  APPLICANT_2,
  APPLICANT_2_CALLBACK_URL,
  APPLICANT_2_SIGN_IN_URL,
  CALLBACK_URL,
  ENTER_YOUR_ACCESS_CODE,
  PageLink,
  RESPONDENT,
  SIGN_IN_URL,
  SIGN_OUT_URL,
} from '../../steps/urls';

import { noSignInRequiredUrls } from './noSignInRequiredUrls';

/**
 * Adds the oidc middleware to add oauth authentication
 */
export class OidcMiddleware {
  public enableFor(app: Application): void {
    const protocol = app.locals.developmentMode ? 'http://' : 'https://';
    const port = app.locals.developmentMode ? `:${config.get('port')}` : '';
    const { errorHandler } = app.locals;

    app.get([SIGN_IN_URL, APPLICANT_2_SIGN_IN_URL], (req, res) =>
      res.redirect(getRedirectUrl(`${protocol}${res.locals.host}${port}`, req.path))
    );
    app.get(SIGN_OUT_URL, (req, res) => req.session.destroy(() => res.redirect('/')));
    app.get([CALLBACK_URL, APPLICANT_2_CALLBACK_URL], errorHandler(this.callbackHandler(protocol, port)));

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if (req.session?.user) {
          res.locals.isLoggedIn = true;
          req.locals.api = getCaseApi(req.session.user, req.locals.logger);

          if (
            req.path.endsWith(APPLICANT_2) ||
            req.path.endsWith(RESPONDENT) ||
            req.path.endsWith(ENTER_YOUR_ACCESS_CODE)
          ) {
            return next();
          }

          try {
            req.session.userCase =
              req.session.userCase || (await req.locals.api.getOrCreateCase(res.locals.serviceType, req.session.user));
          } catch (e) {
            if (e instanceof InProgressDivorceCase) {
              const token = encodeURIComponent(req.session.user.accessToken);
              return res.redirect(config.get('services.decreeNisi.url') + `/authenticated?__auth-token=${token}`);
            } else {
              return res.redirect(SIGN_OUT_URL);
            }
          }

          req.session.isApplicant2 =
            req.session.isApplicant2 ??
            (await req.locals.api.isApplicant2(req.session.userCase.id, req.session.user.id));

          req.session.save(err => {
            if (err) {
              res.redirect(SIGN_OUT_URL);
            } else {
              next();
            }
          });
        } else {
          if (noSignInRequiredUrls.includes(req.url as PageLink)) {
            next();
          } else if (req.url.startsWith(APPLICANT_2) || req.url.startsWith(RESPONDENT)) {
            res.redirect(APPLICANT_2_SIGN_IN_URL);
          } else {
            res.redirect(SIGN_IN_URL);
          }
        }
      })
    );
  }

  private callbackHandler(protocol: string, port: string) {
    return async (req, res) => {
      const isApplicant2 = req.path === APPLICANT_2_CALLBACK_URL;
      if (typeof req.query.code === 'string') {
        req.session.user = await getUserDetails(
          `${protocol}${res.locals.host}${port}`,
          req.query.code,
          isApplicant2 ? APPLICANT_2_CALLBACK_URL : CALLBACK_URL
        );

        const url = req.session.user.roles.includes('caseworker')
          ? 'https://manage-case.platform.hmcts.net/'
          : isApplicant2
          ? `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`
          : '/';

        req.session.save(() => res.redirect(url));
      } else {
        res.redirect(isApplicant2 ? APPLICANT_2_SIGN_IN_URL : SIGN_IN_URL);
      }
    };
  }
}
