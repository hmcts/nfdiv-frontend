import { Logger } from '@hmcts/nodejs-logging';
import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { getCaseApi } from '../../app/case/case-api';
import { ApplicationType, DivorceOrDissolution, State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { isLinkingUrl, signInNotRequired } from '../../steps/url-utils';
import {
  APPLICANT_1,
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
    const safeListedUrls = ['https://manage-case.aat.platform.hmcts.net/', 'https://manage-case.platform.hmcts.net/'];
    app.get([SIGN_IN_URL, APPLICANT_2_SIGN_IN_URL], (req, res) =>
      res.redirect(getRedirectUrl(`${protocol}${res.locals.host}${port}`, req.path))
    );
    app.get(SIGN_OUT_URL, (req, res) => req.session.destroy(() => res.redirect('/')));
    app.get([CALLBACK_URL, APPLICANT_2_CALLBACK_URL], errorHandler(this.callbackHandler(protocol, port)));

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if (req.session?.user) {
          if (
            req.session.user.roles.includes('caseworker') ||
            req.session.user.roles.includes('caseworker-divorce-solicitor')
          ) {
            const redirectUrl = app.locals.developmentMode ? safeListedUrls[0] : safeListedUrls[1];
            res.redirect(redirectUrl);
          }
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
    const logger = Logger.getLogger('find-existing-and-new-user-cases');
    const userEmail = req.session.user.email;
    const serviceType = res.locals.serviceType;

    try {
      const { newInviteUserCase, existingUserCase } = await req.locals.api.getExistingAndNewUserCases(
        userEmail,
        serviceType,
        req.locals.logger
      );

      let redirectUrl;
      if (newInviteUserCase && existingUserCase) {
        req.session.inviteCaseId = newInviteUserCase.id;
        req.session.inviteCaseApplicationType = newInviteUserCase.applicationType;
        req.session.existingCaseId = existingUserCase.id;
        if (!req.path.includes(EXISTING_APPLICATION)) {
          logger.info(`User (${req.session.user.id}) is being redirected to existing-application page`);
          redirectUrl = EXISTING_APPLICATION;
        }
      } else if (newInviteUserCase) {
        req.session.inviteCaseId = newInviteUserCase.id;
        if (!isLinkingUrl(req.path)) {
          logger.info(`User (${req.session.user.id}) is being redirected to linking page`);
          if (req.session.user.email.toLowerCase() === newInviteUserCase.applicant1Email?.toLowerCase()) {
            redirectUrl = `${APPLICANT_1}${ENTER_YOUR_ACCESS_CODE}`;
          } else {
            redirectUrl = `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`;
          }
        }
      } else {
        if (!existingUserCase) {
          if (await req.locals.api.hasDivorceOrDissolutionCaseForOtherDomain(userEmail, serviceType, logger)) {
            logger.info(
              `UserID ${req.session.user.id} is being redirected to domain for the other divorceOrDissolution type`
            );

            return res.redirect(
              (res.locals.serviceType === DivorceOrDissolution.DIVORCE
                ? config.get('services.nfdiv_dissolution.url')
                : config.get('services.nfdiv_divorce.url')) as string
            );
          }
          if (config.get('services.case.checkDivCases') && (await req.locals.api.hasInProgressDivorceCase())) {
            logger.info(`UserID ${req.session.user.id} being redirected to old divorce`);
            const axios = require('axios');

            const token = req.session.user.accessToken;
            const decreeNisiUrl = config.get('services.decreeNisi.url') + '/authenticated';
            axios
              .post(
                decreeNisiUrl,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(() => {
                res.redirect(decreeNisiUrl);
              })
              .catch(error => {
                console.error('Error authenticating with Old Divorce service:', error);
                res.status(500).send('Internal Server Error');
              });
          }
          if (isLinkingUrl(req.path)) {
            return next();
          }
        }
        req.session.userCase = req.session.userCase || existingUserCase;

        req.session.existingCaseId = req.session.userCase?.id;

        req.session.isApplicant2 =
          req.session.isApplicant2 ??
          (req.session.userCase
            ? await req.locals.api.isApplicant2(req.session.userCase.id, req.session.user.id)
            : false);
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
      return res.redirect(SIGN_OUT_URL);
    }
  }

  private callbackHandler(protocol: string, port: string) {
    return async (req, res) => {
      const isApp2Callback = req.path === APPLICANT_2_CALLBACK_URL;
      const callbackUrl = isApp2Callback ? APPLICANT_2_CALLBACK_URL : CALLBACK_URL;
      const signInUrl = isApp2Callback ? APPLICANT_2_SIGN_IN_URL : SIGN_IN_URL;
      const successUrl = isApp2Callback ? `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}` : HOME_URL;

      if (typeof req.query.code === 'string') {
        try {
          req.session.user = await getUserDetails(`${protocol}${res.locals.host}${port}`, req.query.code, callbackUrl);
        } catch (e) {
          req.locals.logger.info('Failed to get user details: ', e);
          return res.redirect(signInUrl);
        }

        return req.session.save(() => res.redirect(successUrl));
      } else {
        return res.redirect(signInUrl);
      }
    };
  }
}
