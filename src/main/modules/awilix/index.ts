import { InjectionMode, asClass, asValue, createContainer } from 'awilix';
import { Application } from 'express';
import type { LoggerInstance } from 'winston';

import { ErrorController } from '../../steps/error/error.controller';
import { HomeGetController } from '../../steps/home/get';
import { SaveSignOutGetController } from '../../steps/save-sign-out/get';
import { TermsAndConditionsGetController } from '../../steps/terms-and-conditions/get';

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('app');

/**
 * Sets up the dependency injection container
 */
export class Container {
  public enableFor(app: Application): void {
    app.locals.container = createContainer({ injectionMode: InjectionMode.CLASSIC }).register({
      logger: asValue(logger),
      homeGetController: asValue(new HomeGetController()),
      saveSignOutGetController: asValue(new SaveSignOutGetController()),
      termsAndConditionsGetController: asValue(new TermsAndConditionsGetController()),
      errorController: asClass(ErrorController),
    });
  }
}
