import fs from 'fs';

import { Application } from 'express';

import { GetController } from '../main/app/controller/GetController';
import { PostController } from '../main/app/controller/PostController';
import { Form } from '../main/app/form/Form';

import { sequence } from './steps/sequence';
import {
  ACCESSIBILITY_STATEMENT_URL,
  COOKIES_URL,
  CSRF_TOKEN_ERROR_URL,
  HOME_URL,
  PRIVACY_POLICY_URL,
  SAVE_SIGN_OUT_URL,
  TERMS_AND_CONDITIONS_URL,
} from './steps/urls';

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    app.get(HOME_URL, errorHandler(app.locals.container.cradle.homeGetController.get));
    app.get(SAVE_SIGN_OUT_URL, errorHandler(app.locals.container.cradle.saveSignOutGetController.get));
    app.get(PRIVACY_POLICY_URL, app.locals.container.cradle.privacyPolicyGetController.get);
    app.get(TERMS_AND_CONDITIONS_URL, errorHandler(app.locals.container.cradle.termsAndConditionsGetController.get));
    app.get(COOKIES_URL, errorHandler(app.locals.container.cradle.cookiesGetController.get));
    app.get(ACCESSIBILITY_STATEMENT_URL, app.locals.container.cradle.accessibilityStatementGetController.get);

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

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(app.locals.container.cradle.errorController.CSRFTokenError));
    app.use(app.locals.container.cradle.errorController.notFound);
  }
}
