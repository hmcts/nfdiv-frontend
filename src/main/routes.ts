import fs from 'fs';
import { extname } from 'path';

import { Application, NextFunction, RequestHandler, Response } from 'express';
import multer from 'multer';

import { AccessCodePostController } from './app/access-code/AccessCodePostController';
import { ApplicationType, State } from './app/case/definition';
import { AppRequest } from './app/controller/AppRequest';
import { GetController } from './app/controller/GetController';
import { PostController } from './app/controller/PostController';
import { DocumentManagerController } from './app/document/DocumentManagementController';
import { cookieMaxAge } from './modules/session';
import { stepsWithContent } from './steps';
import { AccessibilityStatementGetController } from './steps/accessibility-statement/get';
import { PostcodeLookupPostController } from './steps/applicant1/postcode-lookup/post';
import { applicant1PostSubmissionSequence } from './steps/applicant1Sequence';
import * as applicant2AccessCodeContent from './steps/applicant2/enter-your-access-code/content';
import { Applicant2AccessCodeGetController } from './steps/applicant2/enter-your-access-code/get';
import { applicant2PostSubmissionSequence } from './steps/applicant2Sequence';
import { CookiesGetController } from './steps/cookies/get';
import { ErrorController } from './steps/error/error.controller';
import { HomeGetController } from './steps/home/get';
import { NoResponseYetApplicationGetController } from './steps/no-response-yet/get';
import { PrivacyPolicyGetController } from './steps/privacy-policy/get';
import { respondentPostSubmissionSequence } from './steps/respondentSequence';
import { SaveSignOutGetController } from './steps/save-sign-out/get';
import { currentStateFn } from './steps/state-sequence';
import * as switchToSoleAppContent from './steps/switch-to-sole-application/content';
import { SwitchToSoleApplicationGetController } from './steps/switch-to-sole-application/get';
import { SwitchToSoleApplicationPostController } from './steps/switch-to-sole-application/post';
import { TermsAndConditionsGetController } from './steps/terms-and-conditions/get';
import { TimedOutGetController } from './steps/timed-out/get';
import {
  ACCESSIBILITY_STATEMENT_URL,
  APPLICANT_2,
  COOKIES_URL,
  CSRF_TOKEN_ERROR_URL,
  DOCUMENT_MANAGER,
  ENTER_YOUR_ACCESS_CODE,
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
} from './steps/urls';

const handleUploads = multer();
const ext = extname(__filename);

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    const errorController = new ErrorController();

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(errorController.CSRFTokenError));
    app.get([HOME_URL, APPLICANT_2], errorHandler(new HomeGetController().get));
    app.get(SAVE_AND_SIGN_OUT, errorHandler(new SaveSignOutGetController().get));
    app.get(TIMED_OUT_URL, errorHandler(new TimedOutGetController().get));
    app.get(PRIVACY_POLICY_URL, errorHandler(new PrivacyPolicyGetController().get));
    app.get(TERMS_AND_CONDITIONS_URL, errorHandler(new TermsAndConditionsGetController().get));
    app.get(COOKIES_URL, errorHandler(new CookiesGetController().get));
    app.get(ACCESSIBILITY_STATEMENT_URL, errorHandler(new AccessibilityStatementGetController().get));
    app.post(POSTCODE_LOOKUP, errorHandler(new PostcodeLookupPostController().post));

    const documentManagerController = new DocumentManagerController();
    app.post(DOCUMENT_MANAGER, handleUploads.array('files[]', 5), errorHandler(documentManagerController.post));
    app.get(`${DOCUMENT_MANAGER}/delete/:index`, errorHandler(documentManagerController.delete));

    const isRouteForUser = (req: AppRequest, res: Response, next: NextFunction): void => {
      const isApp2Route = [APPLICANT_2, RESPONDENT].some(prefixUrl => req.path.includes(prefixUrl));
      if ((isApp2Route && !req.session.isApplicant2) || (!isApp2Route && req.session.isApplicant2)) {
        return res.redirect('/error');
      }
      next();
    };

    const whichSequence = (req: AppRequest): boolean => {
      // combine this with getUserSequence on index.ts
      let theSequence;
      if (req.session.isApplicant2) {
        if (req.session.userCase.applicationType === ApplicationType.JOINT_APPLICATION) {
          theSequence = applicant2PostSubmissionSequence;
        } else {
          theSequence = respondentPostSubmissionSequence;
        }
      } else {
        theSequence = applicant1PostSubmissionSequence;
      }

      return theSequence.find(r => r.url === req.url);
    };

    const isPreOrPostSubmissionPage = (req: AppRequest, res: Response, next: NextFunction): void => {
      const stateSequence = currentStateFn(req.session.userCase);
      if (stateSequence.isAfter(State.Holding) && !whichSequence(req)) {
        console.log('here111999191');
        return res.redirect('/error');
      }
      next();
    };

    for (const step of stepsWithContent) {
      const getController = fs.existsSync(`${step.stepDir}/get${ext}`)
        ? require(`${step.stepDir}/get${ext}`).default
        : GetController;

      app.get(
        step.url,
        isRouteForUser as RequestHandler,
        isPreOrPostSubmissionPage as RequestHandler,
        errorHandler(new getController(step.view, step.generateContent).get)
      );

      if (step.form) {
        const postController = fs.existsSync(`${step.stepDir}/post${ext}`)
          ? require(`${step.stepDir}/post${ext}`).default
          : PostController;
        app.post(step.url, errorHandler(new postController(step.form.fields).post));
      }
    }

    app.get(`${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`, errorHandler(new Applicant2AccessCodeGetController().get));
    app.post(
      `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`,
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
}
