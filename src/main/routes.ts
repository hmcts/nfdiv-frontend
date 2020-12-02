import { Application } from 'express';
import { Steps } from './steps/steps';

export class Routes {
  public enableFor(app: Application): void {

    app.get(Steps.HOME, app.locals.container.cradle.homeGetController.get);
    app.get(Steps.FIRST_PAGE, app.locals.container.cradle.firstPageGetController.get);
    app.post(Steps.FIRST_PAGE, app.locals.container.cradle.firstPagePostController.post);

    app.use(app.locals.container.cradle.errorController.notFound);
    app.use(app.locals.container.cradle.errorController.internalServerError);

  }
}
