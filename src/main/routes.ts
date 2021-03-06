import fs from 'fs';

import { Application, RequestHandler, Response } from 'express';
import multer from 'multer';

import { AppRequest } from './app/controller/AppRequest';
import { GetController } from './app/controller/GetController';
import { PostController } from './app/controller/PostController';
import { DocumentManagerController } from './app/document/DocumentManagementController';
import { Form } from './app/form/Form';
import { cookieMaxAge } from './modules/session';
import { stepsWithContent } from './steps';
import { AccessibilityStatementGetController } from './steps/accessibility-statement/get';
import { PostcodeLookupPostController } from './steps/applicant1/postcode-lookup/post';
import { CookiesGetController } from './steps/cookies/get';
import { ErrorController } from './steps/error/error.controller';
import { HomeGetController } from './steps/home/get';
import { PrivacyPolicyGetController } from './steps/privacy-policy/get';
import { SaveSignOutGetController } from './steps/save-sign-out/get';
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
  POSTCODE_LOOKUP,
  PRIVACY_POLICY_URL,
  SAVE_AND_SIGN_OUT,
  SIGN_OUT_URL,
  TERMS_AND_CONDITIONS_URL,
  TIMED_OUT_URL,
} from './steps/urls';

const handleUploads = multer();

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    const errorController = new ErrorController();

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(errorController.CSRFTokenError));
    app.get(HOME_URL, errorHandler(new HomeGetController().get));
    app.get(SAVE_AND_SIGN_OUT, errorHandler(new SaveSignOutGetController().get));
    app.get(TIMED_OUT_URL, errorHandler(new TimedOutGetController().get));
    app.get(PRIVACY_POLICY_URL, errorHandler(new PrivacyPolicyGetController().get));
    app.get(TERMS_AND_CONDITIONS_URL, errorHandler(new TermsAndConditionsGetController().get));
    app.get(COOKIES_URL, errorHandler(new CookiesGetController().get));
    app.get(ACCESSIBILITY_STATEMENT_URL, errorHandler(new AccessibilityStatementGetController().get));
    app.get(ENTER_YOUR_ACCESS_CODE, (req, res) => res.redirect(`${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`));
    app.post(POSTCODE_LOOKUP, errorHandler(new PostcodeLookupPostController().post));

    const documentManagerController = new DocumentManagerController();
    app.post(DOCUMENT_MANAGER, handleUploads.array('files[]', 5), errorHandler(documentManagerController.post));
    app.get(`${DOCUMENT_MANAGER}/delete/:id`, errorHandler(documentManagerController.delete));

    for (const step of stepsWithContent) {
      const getController = fs.existsSync(`${step.stepDir}/get.ts`)
        ? require(`${step.stepDir}/get.ts`).default
        : GetController;

      app.get(step.url, errorHandler(new getController(step.view, step.generateContent).get));

      if (step.form) {
        const postController = fs.existsSync(`${step.stepDir}/post.ts`)
          ? require(`${step.stepDir}/post.ts`).default
          : PostController;
        app.post(step.url, errorHandler(new postController(new Form(step.form)).post));
      }
    }

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
