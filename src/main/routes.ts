import { Application } from 'express';
import { FIRST_PAGE_URL, HOME_URL, LANGUAGE_PREFERENCE_URL } from './steps/urls';

export class Routes {
  public enableFor(app: Application): void {

    app.get(HOME_URL, app.locals.container.cradle.homeGetController.get);
    app.get(FIRST_PAGE_URL, app.locals.container.cradle.firstPageGetController.get);
    app.post(FIRST_PAGE_URL, app.locals.container.cradle.firstPagePostController.post);
    app.get(LANGUAGE_PREFERENCE_URL, app.locals.container.cradle.languagePreferenceGetController.get);

    app.use(app.locals.container.cradle.errorController.notFound);
    app.use(app.locals.container.cradle.errorController.internalServerError);

  }
}
