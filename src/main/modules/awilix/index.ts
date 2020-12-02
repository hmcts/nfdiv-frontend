import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import { Application } from 'express';
import { ErrorController } from '../../steps/error/error.controller';
import { HomeGetController } from '../../steps/home/home.get';
import { FirstPageGet } from '../../steps/first-page/first-page.get';
import { FirstPagePost } from '../../steps/first-page/first-page.post';
import { Form } from '../../app/form/Form';

const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('app');

/**
 * Sets up the dependency injection container
 */
export class Container {

  public enableFor(app: Application): void {

    app.locals.container = createContainer({ injectionMode: InjectionMode.CLASSIC }).register({
      logger: asValue(logger),
      homeGetController: asValue(new HomeGetController()),
      firstPageGetController: asValue(new FirstPageGet()),
      firstPagePostController: asValue(new FirstPagePost(new Form())),
      errorController: asClass(ErrorController),
      exposeErrors: asValue(app.locals.env === 'development')
    });
  }

}
