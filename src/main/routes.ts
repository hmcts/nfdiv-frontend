import fs from 'fs';
import { extname } from 'path';

import { Application, NextFunction, RequestHandler, Response } from 'express';
import multer from 'multer';

import { AccessCodePostController } from './app/access-code/AccessCodePostController';
import { AppRequest } from './app/controller/AppRequest';
import { GetController } from './app/controller/GetController';
import { PostController } from './app/controller/PostController';
import { DocumentManagerController } from './app/document/DocumentManagementController';
import { cookieMaxAge } from './modules/session';
import { getUserSequence, stepsWithContent } from './steps';
import { AccessibilityStatementGetController } from './steps/accessibility-statement/get';
import { PostcodeLookupPostController } from './steps/applicant1/postcode-lookup/post';
import * as applicant2AccessCodeContent from './steps/applicant2/enter-your-access-code/content';
import { Applicant2AccessCodeGetController } from './steps/applicant2/enter-your-access-code/get';
import { ContactUsGetController } from './steps/contact-us/get';
import { CookiesGetController } from './steps/cookies/get';
import { ErrorController } from './steps/error/error.controller';
import * as existingApplicationContent from './steps/existing-application/content';
import { ExistingApplicationGetController } from './steps/existing-application/get';
import { ExistingApplicationPostController } from './steps/existing-application/post';
import { HomeGetController } from './steps/home/get';
import { NoResponseYetApplicationGetController } from './steps/no-response-yet/get';
import { PrivacyPolicyGetController } from './steps/privacy-policy/get';
import { SaveSignOutGetController } from './steps/save-sign-out/get';
import * as switchToSoleAppContent from './steps/switch-to-sole-application/content';
import { SwitchToSoleApplicationGetController } from './steps/switch-to-sole-application/get';
import { SwitchToSoleApplicationPostController } from './steps/switch-to-sole-application/post';
import { TermsAndConditionsGetController } from './steps/terms-and-conditions/get';
import { TimedOutGetController } from './steps/timed-out/get';
import {
  ACCESSIBILITY_STATEMENT_URL,
  APPLICANT_2,
  CONTACT_US,
  COOKIES_URL,
  CSRF_TOKEN_ERROR_URL,
  DOCUMENT_MANAGER,
  ENTER_YOUR_ACCESS_CODE,
  EXISTING_APPLICATION,
  HOME_URL,
  NO_RESPONSE_YET,
  POSTCODE_LOOKUP,
  PRIVACY_POLICY_URL,
  RESPONDENT,
  SAVE_AND_SIGN_OUT,
  SIGN_OUT_URL,
  SWITCH_TO_SOLE_APPLICATION,
  TERMS_AND_CONDITIONS_URL,
  TIMED_OUT_URL,
  WEBCHAT_URL,
} from './steps/urls';
import { WebChatGetController } from './steps/webchat/get';

const handleUploads = multer();
const ext = extname(__filename);

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    const errorController = new ErrorController();

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(errorController.CSRFTokenError));
    app.get(EXISTING_APPLICATION, errorHandler(new ExistingApplicationGetController().get));
    app.post(
      EXISTING_APPLICATION,
      errorHandler(new ExistingApplicationPostController(existingApplicationContent.form.fields).post)
    );
    app.get(HOME_URL, errorHandler(new HomeGetController().get));
    app.get(SAVE_AND_SIGN_OUT, errorHandler(new SaveSignOutGetController().get));
    app.get(TIMED_OUT_URL, errorHandler(new TimedOutGetController().get));
    app.get(PRIVACY_POLICY_URL, errorHandler(new PrivacyPolicyGetController().get));
    app.get(TERMS_AND_CONDITIONS_URL, errorHandler(new TermsAndConditionsGetController().get));
    app.get(COOKIES_URL, errorHandler(new CookiesGetController().get));
    app.get(ACCESSIBILITY_STATEMENT_URL, errorHandler(new AccessibilityStatementGetController().get));
    app.get(WEBCHAT_URL, errorHandler(new WebChatGetController().get));
    app.get(CONTACT_US, errorHandler(new ContactUsGetController().get));
    app.post(POSTCODE_LOOKUP, errorHandler(new PostcodeLookupPostController().post));

    const documentManagerController = new DocumentManagerController();
    app.post(DOCUMENT_MANAGER, handleUploads.array('files[]', 5), errorHandler(documentManagerController.post));
    app.get(`${DOCUMENT_MANAGER}/delete/:index`, errorHandler(documentManagerController.delete));

    for (const step of stepsWithContent) {
      const getController = fs.existsSync(`${step.stepDir}/get${ext}`)
        ? require(`${step.stepDir}/get${ext}`).default
        : GetController;

      app.get(
        step.url,
        this.isRouteForUser as RequestHandler,
        errorHandler(new getController(step.view, step.generateContent).get)
      );

      if (step.form) {
        const postController = fs.existsSync(`${step.stepDir}/post${ext}`)
          ? require(`${step.stepDir}/post${ext}`).default
          : PostController;
        app.post(step.url, errorHandler(new postController(step.form.fields).post));
      }
    }

    app.get(
      [APPLICANT_2, RESPONDENT, `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`],
      errorHandler(new Applicant2AccessCodeGetController().get)
    );
    app.post(
      [APPLICANT_2, RESPONDENT, `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`],
      errorHandler(new AccessCodePostController(applicant2AccessCodeContent.form.fields).post)
    );

    app.get(NO_RESPONSE_YET, errorHandler(new NoResponseYetApplicationGetController().get));

    app.get(SWITCH_TO_SOLE_APPLICATION, errorHandler(new SwitchToSoleApplicationGetController().get));
    app.post(
      SWITCH_TO_SOLE_APPLICATION,
      errorHandler(new SwitchToSoleApplicationPostController(switchToSoleAppContent.form.fields).post)
    );

    app.get(
      '/active',
      errorHandler((req: AppRequest, res: Response) => {
        if (!req.session.user) {
          return res.redirect(SIGN_OUT_URL);
        }
        req.session.cookie.expires = new Date(Date.now() + cookieMaxAge);
        req.session.cookie.maxAge = cookieMaxAge;
        req.session.save(err => {
          if (err) {
            throw err;
          }
          res.end();
        });
      })
    );

    app.use(errorController.notFound as unknown as RequestHandler);
  }

  private isRouteForUser(req: AppRequest, res: Response, next: NextFunction): void {
    const isApp2Route = [APPLICANT_2, RESPONDENT].some(prefixUrl => req.path.includes(prefixUrl));
    if (isApp2Route !== req.session.isApplicant2 || !getUserSequence(req).some(r => req.path.includes(r.url))) {
      return res.redirect('/error');
    }
    next();
  }
}
