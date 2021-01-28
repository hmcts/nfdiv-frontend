import { Application } from 'express';

import {
  CSRF_TOKEN_ERROR_URL,
  FIRST_PAGE_URL,
  HAS_MARRIAGE_BROKEN_URL,
  HOME_URL,
  LANGUAGE_PREFERENCE_URL,
  MARRIAGE_CERTIFICATE_URL,
  RESPONDENT_ADDRESS_URL,
} from './steps/urls';

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    app.get(HOME_URL, errorHandler(app.locals.container.cradle.homeGetController.get));
    app.get(FIRST_PAGE_URL, errorHandler(app.locals.container.cradle.firstPageGetController.get));
    app.post(FIRST_PAGE_URL, errorHandler(app.locals.container.cradle.firstPagePostController.post));
    app.get(LANGUAGE_PREFERENCE_URL, errorHandler(app.locals.container.cradle.languagePreferenceGetController.get));
    app.post(LANGUAGE_PREFERENCE_URL, errorHandler(app.locals.container.cradle.languagePreferencePostController.post));
    app.get(HAS_MARRIAGE_BROKEN_URL, errorHandler(app.locals.container.cradle.hasMarriageBrokenGetController.get));
    app.post(HAS_MARRIAGE_BROKEN_URL, errorHandler(app.locals.container.cradle.hasMarriageBrokenPostController.post));
    app.get(RESPONDENT_ADDRESS_URL, errorHandler(app.locals.container.cradle.respondentAddressGetController.get));
    app.post(RESPONDENT_ADDRESS_URL, errorHandler(app.locals.container.cradle.respondentAddressPostController.post));
    app.get(MARRIAGE_CERTIFICATE_URL, errorHandler(app.locals.container.cradle.marriageCertificateGetController.get));
    app.post(
      MARRIAGE_CERTIFICATE_URL,
      errorHandler(app.locals.container.cradle.marriageCertificatePostController.post)
    );

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(app.locals.container.cradle.errorController.CSRFTokenError));
    app.use(app.locals.container.cradle.errorController.notFound);
  }
}
