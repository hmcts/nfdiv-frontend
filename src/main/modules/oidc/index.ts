import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { InProgressDivorceCase, getCaseApi } from '../../app/case/CaseApi';
import { ApplicationType, State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import {
  APPLICANT_2,
  APPLICANT_2_CALLBACK_URL,
  APPLICANT_2_SIGN_IN_URL,
  CALLBACK_URL,
  ENTER_YOUR_ACCESS_CODE,
  HOME_URL,
  PageLink,
  RESPONDENT,
  SIGN_IN_URL,
  SIGN_OUT_URL,
  SWITCH_TO_SOLE_APPLICATION,
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
    app.get(
      CALLBACK_URL,
      errorHandler(async (req, res) => {
        if (typeof req.query.code === 'string') {
          req.session.user = await getUserDetails(`${protocol}${res.locals.host}${port}`, req.query.code, CALLBACK_URL);

          const url = req.session.user.roles.includes('caseworker') ? 'https://manage-case.platform.hmcts.net/' : '/';
          req.session.save(() => res.redirect(url));
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

          const url = req.session.user.roles.includes('caseworker')
            ? 'https://manage-case.platform.hmcts.net/'
            : `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`;

          req.session.save(() => res.redirect(url));
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
            try {
              req.session.userCase =
                req.session.userCase ||
                (await req.locals.api.getOrCreateCase(res.locals.serviceType, req.session.user));
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
          }

          if (
            req.path.endsWith(SWITCH_TO_SOLE_APPLICATION) &&
            req.session.userCase.state !== State.Applicant2Approved &&
            req.session.userCase.applicationType !== ApplicationType.JOINT_APPLICATION &&
            req.session.isApplicant2
          ) {
            return res.redirect(HOME_URL);
          }

          req.session.save(err => {
            if (err) {
              res.redirect(SIGN_OUT_URL);
            } else {
              next();
            }
          });
        } else if ([APPLICANT_2, RESPONDENT].includes(req.url as PageLink)) {
          return res.redirect(APPLICANT_2_SIGN_IN_URL);
        } else if (noSignInRequiredUrls.includes(req.url as PageLink)) {
          next();
        } else {
          return res.redirect(SIGN_IN_URL);
        }
      })
    );
  }
}
