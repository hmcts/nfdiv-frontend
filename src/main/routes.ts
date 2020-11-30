import { Application } from 'express';

export class Routes {
  public enableFor(app: Application): void {

    app.get('/', app.locals.container.cradle.homeController.get);

    app.use(app.locals.container.cradle.errorController.notFound);
    app.use(app.locals.container.cradle.errorController.internalServerError);

  }
}
