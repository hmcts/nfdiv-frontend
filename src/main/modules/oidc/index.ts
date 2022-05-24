import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { InProgressDivorceCase, getCaseApi } from '../../app/case/case-api';
import { AppRequest } from '../../app/controller/AppRequest';
import {
  ACCESSIBILITY_STATEMENT_URL,
  APPLICANT_2,
  APPLICANT_2_CALLBACK_URL,
  APPLICANT_2_SIGN_IN_URL,
  CALLBACK_URL,
  COOKIES_URL,
  ENTER_YOUR_ACCESS_CODE,
  PRIVACY_POLICY_URL,
  PageLink,
  RESPONDENT,
  SIGN_IN_URL,
  SIGN_OUT_URL,
  TERMS_AND_CONDITIONS_URL,
  WEBCHAT_URL,
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

    app.get(SIGN_IN_URL, (req, res) =>
      res.redirect(getRedirectUrl(`${protocol}${res.locals.host}${port}`, CALLBACK_URL))
    );
    app.get(APPLICANT_2_SIGN_IN_URL, (req, res) =>
      res.redirect(getRedirectUrl(`${protocol}${res.locals.host}${port}`, APPLICANT_2_CALLBACK_URL))
    );
    app.get(SIGN_OUT_URL, (req, res) => req.session.destroy(() => res.redirect('/')));

    app.get(CALLBACK_URL, errorHandler(this.callbackHandler(protocol, port)));

    app.get(APPLICANT_2_CALLBACK_URL, errorHandler(this.applicant2CallbackHandler(protocol, port)));

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if (req.session?.user) {
          res.locals.isLoggedIn = true;
          req.locals.api = getCaseApi(req.session.user, req.locals.logger);

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
          req.session.isLinkedToCase =
            req.session.isLinkedToCase ||
            (await req.locals.api.isLinkedToCase(req.session.userCase.id, req.session.user));
          if (!req.session.isLinkedToCase && !req.path.endsWith(ENTER_YOUR_ACCESS_CODE)) {
            return res.redirect(`${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`);
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
        } else if (noSignInRequiredUrls.includes(req.url as PageLink)) {
          next();
        } else {
          switch (req.url as PageLink) {
            case ACCESSIBILITY_STATEMENT_URL:
            case WEBCHAT_URL:
            case PRIVACY_POLICY_URL:
            case TERMS_AND_CONDITIONS_URL:
            case COOKIES_URL:
              next();
              break;
            case APPLICANT_2:
            case RESPONDENT:
              res.redirect(APPLICANT_2_SIGN_IN_URL);
              break;
            default:
              res.redirect(SIGN_IN_URL);
              break;
          }
        }
      })
    );
  }

  private callbackHandler(protocol: string, port: string) {
    return async (req, res) => {
      if (typeof req.query.code === 'string') {
        req.session.user = await getUserDetails(`${protocol}${res.locals.host}${port}`, req.query.code, CALLBACK_URL);

        const url = req.session.user.roles.includes('caseworker') ? 'https://manage-case.platform.hmcts.net/' : '/';
        req.session.save(() => res.redirect(url));
      } else {
        res.redirect(SIGN_IN_URL);
      }
    };
  }

  private applicant2CallbackHandler(protocol: string, port: string) {
    return async (req, res) => {
      if (typeof req.query.code === 'string') {
        req.session.user = await getUserDetails(
          `${protocol}${res.locals.host}${port}`,
          req.query.code,
          APPLICANT_2_CALLBACK_URL
        );

        const url = req.session.user.roles.includes('caseworker')
          ? 'https://manage-case.platform.hmcts.net/'
          : `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`;

        req.session.save(() => res.redirect(url));
      } else {
        res.redirect(APPLICANT_2_SIGN_IN_URL);
      }
    };
  }
}
