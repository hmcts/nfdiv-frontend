import { Application } from 'express';
import { HomeGetController } from './steps/home/home.get';
import { FirstPageGet } from './steps/first-page/first-page.get';

export class Routes {
  public enableFor(app: Application): void {

    app.get(HomeGetController.URL, app.locals.container.cradle.homeGetController.get);
    app.get(FirstPageGet.URL, app.locals.container.cradle.firstPageGetController.get);
    app.get(FirstPageGet.URL, app.locals.container.cradle.firstPagePostController.post);

    app.use(app.locals.container.cradle.errorController.notFound);
    app.use(app.locals.container.cradle.errorController.internalServerError);

  }
}
