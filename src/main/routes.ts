import fs from 'fs';

import { Application } from 'express';

import { GetController } from '../main/app/controller/GetController';
import { PostController } from '../main/app/controller/PostController';
import { Form } from '../main/app/form/Form';

import { getSteps } from './steps';
import { CSRF_TOKEN_ERROR_URL, HOME_URL, SAVE_SIGN_OUT_URL, TERMS_AND_CONDITIONS_URL } from './steps/urls';

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    app.get(HOME_URL, errorHandler(app.locals.container.cradle.homeGetController.get));
    app.get(SAVE_SIGN_OUT_URL, errorHandler(app.locals.container.cradle.saveSignOutGetController.get));
    app.get(TERMS_AND_CONDITIONS_URL, errorHandler(app.locals.container.cradle.termsAndConditionsGetController.get));

    for (const step of getSteps()) {
      const stepDir = `${__dirname}/steps/sequence/${step.id}`;
      const view = `${stepDir}/template.njk`;
      const { generateContent, form } = require(`${stepDir}/content.ts`);

      app.get(
        step.url,
        errorHandler(
          new GetController(
            fs.existsSync(view) ? view : `${stepDir}/../template.njk`,
            generateContent(step.title),
            step.id
          ).get
        )
      );

      if (form) {
        app.post(step.url, errorHandler(new PostController(new Form(form), step.id).post));
      }
    }

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(app.locals.container.cradle.errorController.CSRFTokenError));
    app.use(app.locals.container.cradle.errorController.notFound);
  }
}
