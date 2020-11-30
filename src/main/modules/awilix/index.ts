import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import { HomeController } from '../../app/controller/HomeController';
import { Application } from 'express';
import { ErrorController } from '../../app/controller/ErrorController';

const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('app');

/**
 * Sets up the dependency injection container
 */
export class Container {

  public enableFor(app: Application): void {

    app.locals.container = createContainer({ injectionMode: InjectionMode.CLASSIC }).register({
      logger: asValue(logger),
      homeController: asClass(HomeController),
      errorController: asClass(ErrorController),
      exposeErrors: asValue(app.locals.env === 'development')
    });
  }

}
