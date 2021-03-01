import fs from 'fs';

import { Application, RequestHandler, Response } from 'express';

import { GetController } from '../main/app/controller/GetController';
import { PostController } from '../main/app/controller/PostController';
import { Form } from '../main/app/form/Form';

import { AppRequest } from './app/controller/AppRequest';
import { AccessibilityStatementGetController } from './steps/accessibility-statement/get';
import { CookiesGetController } from './steps/cookies/get';
import { ErrorController } from './steps/error/error.controller';
import { HomeGetController } from './steps/home/get';
import { PrivacyPolicyGetController } from './steps/privacy-policy/get';
import { SaveSignOutGetController } from './steps/save-sign-out/get';
import { sequence } from './steps/sequence';
import { TermsAndConditionsGetController } from './steps/terms-and-conditions/get';
import { TimedOutGetController } from './steps/timed-out/get';
import {
  ACCESSIBILITY_STATEMENT_URL,
  COOKIES_URL,
  CSRF_TOKEN_ERROR_URL,
  HOME_URL,
  PRIVACY_POLICY_URL,
  SAVE_SIGN_OUT_URL,
  SIGN_OUT_URL,
  TERMS_AND_CONDITIONS_URL,
  TIMED_OUT_URL,
} from './steps/urls';

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    const errorController = new ErrorController();

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(errorController.CSRFTokenError));
    app.get(HOME_URL, errorHandler(new HomeGetController().get));
    app.get(SAVE_SIGN_OUT_URL, errorHandler(new SaveSignOutGetController().get));
    app.get(TIMED_OUT_URL, errorHandler(new TimedOutGetController().get));
    app.get(PRIVACY_POLICY_URL, errorHandler(new PrivacyPolicyGetController().get));
    app.get(TERMS_AND_CONDITIONS_URL, errorHandler(new TermsAndConditionsGetController().get));
    app.get(COOKIES_URL, errorHandler(new CookiesGetController().get));
    app.get(ACCESSIBILITY_STATEMENT_URL, errorHandler(new AccessibilityStatementGetController().get));

    for (const step of sequence) {
      const stepDir = `${__dirname}/steps/sequence${step.url}`;
      const { generateContent, form } = require(`${stepDir}/content.ts`);
      const customView = `${stepDir}/template.njk`;
      const view = fs.existsSync(customView) ? customView : `${stepDir}/../template.njk`;
      const controller = new GetController(view, generateContent);

      app.get(step.url, errorHandler(controller.get));

      if (form) {
        app.post(step.url, errorHandler(new PostController(new Form(form)).post));
      }
    }

    app.get(
      '/active',
      errorHandler((req: AppRequest, res: Response) => {
        if (!req.session.user) {
          return res.redirect(SIGN_OUT_URL);
        }
      })
    );

    app.use((errorController.notFound as unknown) as RequestHandler);
  }
}
