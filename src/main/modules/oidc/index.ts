import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { InProgressDivorceCase, getCaseApi } from '../../app/case/case-api';
import { ApplicationType, State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { isLinkingUrl, signInNotRequired } from '../../steps/url-utils';
import {
  APPLICANT_2,
  APPLICANT_2_CALLBACK_URL,
  APPLICANT_2_SIGN_IN_URL,
  CALLBACK_URL,
  ENTER_YOUR_ACCESS_CODE,
  EXISTING_APPLICATION,
  HOME_URL,
  PageLink,
  RESPONDENT,
  SIGN_IN_URL,
  SIGN_OUT_URL,
  SWITCH_TO_SOLE_APPLICATION,
} from '../../steps/urls';

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

          if (!req.session.existingCaseId && !req.session.inviteCaseId) {
            return this.findExistingAndNewUserCases(req, res, next);
          }

          if (
            req.path.endsWith(SWITCH_TO_SOLE_APPLICATION) &&
            req.session.userCase.state !== State.Applicant2Approved &&
            req.session.userCase.applicationType !== ApplicationType.JOINT_APPLICATION &&
            req.session.isApplicant2
          ) {
            return res.redirect(HOME_URL);
          }

          return next();
        } else {
          if (signInNotRequired(req.path)) {
            return next();
          } else if ([APPLICANT_2, RESPONDENT].includes(req.path as PageLink)) {
            return res.redirect(APPLICANT_2_SIGN_IN_URL);
          } else {
            return res.redirect(SIGN_IN_URL);
          }
        }
      })
    );
  }

  private async findExistingAndNewUserCases(req: AppRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const newInviteUserCase = await req.locals.api.getNewInviteCase(
        req.session.user.email,
        res.locals.serviceType,
        req.locals.logger
      );

      const existingUserCase = await req.locals.api.getExistingUserCase(res.locals.serviceType);

      let redirectUrl;
      if (newInviteUserCase && existingUserCase) {
        req.session.inviteCaseId = newInviteUserCase.id;
        req.session.inviteCaseApplicationType = newInviteUserCase.applicationType;
        req.session.existingCaseId = existingUserCase.id;
        if (!req.path.includes(EXISTING_APPLICATION)) {
          redirectUrl = EXISTING_APPLICATION;
        }
      } else if (newInviteUserCase) {
        req.session.inviteCaseId = newInviteUserCase.id;
        if (!isLinkingUrl(req.path)) {
          redirectUrl = `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`;
        }
      } else {
        req.session.userCase =
          req.session.userCase ||
          existingUserCase ||
          (await req.locals.api.createCase(res.locals.serviceType, req.session.user));

        req.session.existingCaseId = req.session.userCase.id;

        req.session.isApplicant2 =
          req.session.isApplicant2 ?? (await req.locals.api.isApplicant2(req.session.userCase.id, req.session.user.id));
      }

      req.session.save(err => {
        if (err) {
          return res.redirect(SIGN_OUT_URL);
        } else if (redirectUrl) {
          return res.redirect(redirectUrl);
        } else {
          return next();
        }
      });
    } catch (e) {
      if (e instanceof InProgressDivorceCase) {
        const token = encodeURIComponent(req.session.user.accessToken);
        return res.redirect(config.get('services.decreeNisi.url') + `/authenticated?__auth-token=${token}`);
      } else {
        return res.redirect(SIGN_OUT_URL);
      }
    }
  }

  private callbackHandler(protocol: string, port: string) {
    return async (req, res) => {
      const isApp2Callback = req.path === APPLICANT_2_CALLBACK_URL;
      if (typeof req.query.code === 'string') {
        req.session.user = await getUserDetails(
          `${protocol}${res.locals.host}${port}`,
          req.query.code,
          isApp2Callback ? APPLICANT_2_CALLBACK_URL : CALLBACK_URL
        );

        const url = req.session.user.roles.includes('caseworker')
          ? 'https://manage-case.platform.hmcts.net/'
          : isApp2Callback
          ? `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`
          : '/';

        return req.session.save(() => res.redirect(url));
      } else {
        return res.redirect(isApp2Callback ? APPLICANT_2_SIGN_IN_URL : SIGN_IN_URL);
      }
    };
  }
}
