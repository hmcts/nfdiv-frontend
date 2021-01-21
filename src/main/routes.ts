import { AppRequest } from 'app/controller/AppRequest';
import { Application } from 'express';
import {
  CSRF_TOKEN_ERROR_URL,
  FIRST_PAGE_URL,
  HAS_MARRIAGE_BROKEN_URL,
  HOME_URL,
  LANGUAGE_PREFERENCE_URL, MARRIAGE_CERTIFICATE_URL,
  RESPONDENT_ADDRESS_URL
} from './steps/urls';

export class Routes {
  public enableFor(app: Application): void {
    const {
      homeGetController,
      firstPageGetController,
      firstPagePostController,
      languagePreferenceGetController,
      languagePreferencePostController,
      hasMarriageBrokenGetController,
      hasMarriageBrokenPostController,
      respondentAddressGetController,
      respondentAddressPostController,
      marriageCertificateGetController,
      marriageCertificatePostController,
      errorController,
    } = app.locals.container.cradle;

    const catchErrors = (fn) => (...args) => fn(...args).catch((err: Error) => {
      const [req, res] = args as [AppRequest, Response];
      errorController.internalServerError(err, req, res);
    });

    app.get(HOME_URL, catchErrors(homeGetController.get));
    app.get(FIRST_PAGE_URL, catchErrors(firstPageGetController.get));
    app.post(FIRST_PAGE_URL, catchErrors(firstPagePostController.post));
    app.get(LANGUAGE_PREFERENCE_URL, catchErrors(languagePreferenceGetController.get));
    app.post(LANGUAGE_PREFERENCE_URL, catchErrors(languagePreferencePostController.post));
    app.get(HAS_MARRIAGE_BROKEN_URL, catchErrors(hasMarriageBrokenGetController.get));
    app.post(HAS_MARRIAGE_BROKEN_URL, catchErrors(hasMarriageBrokenPostController.post));
    app.get(RESPONDENT_ADDRESS_URL, catchErrors(respondentAddressGetController.get));
    app.post(RESPONDENT_ADDRESS_URL, catchErrors(respondentAddressPostController.post));
    app.get(MARRIAGE_CERTIFICATE_URL, catchErrors(marriageCertificateGetController.get));
    app.post(MARRIAGE_CERTIFICATE_URL, catchErrors(marriageCertificatePostController.post));

    app.get(CSRF_TOKEN_ERROR_URL, catchErrors(errorController.CSRFTokenError));
    app.use(errorController.notFound);
  }
}
