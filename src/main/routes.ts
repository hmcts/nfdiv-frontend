import { Application } from 'express';

import { getSteps } from './steps/sequence';
import { CSRF_TOKEN_ERROR_URL, HOME_URL, TERMS_AND_CONDITIONS_URL } from './steps/urls';

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    app.get(HOME_URL, errorHandler(app.locals.container.cradle.homeGetController.get));
    app.get(TERMS_AND_CONDITIONS_URL, errorHandler(app.locals.container.cradle.termsAndConditionsGetController.get));

    getSteps().forEach(step => {
      app.get(step.url, errorHandler(app.locals.container.cradle[`${step.id}StepGetController`].get));

      const postController = `${step.id}StepPostController`;
      if (app.locals.container.has(postController)) {
        app.post(step.url, errorHandler(app.locals.container.cradle[postController].post));
      }
    });

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(app.locals.container.cradle.errorController.CSRFTokenError));
    app.use(app.locals.container.cradle.errorController.notFound);
  }
}
