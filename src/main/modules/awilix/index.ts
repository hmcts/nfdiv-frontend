import fs from 'fs';

import { InjectionMode, asClass, asValue, createContainer } from 'awilix';
import { Application } from 'express';
import type { LoggerInstance } from 'winston';

import { GetController } from '../../app/controller/GetController';
import { PostController } from '../../app/controller/PostController';
import { Form } from '../../app/form/Form';
import { ErrorController } from '../../steps/error/error.controller';
import { HomeGetController } from '../../steps/home/get';
import { getSteps } from '../../steps/sequence';
import type { Step } from '../../steps/sequence';
import { TermsAndConditionsGetController } from '../../steps/terms-and-conditions/get';

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('app');

/**
 * Sets up the dependency injection container
 */
export class Container {
  public enableFor(app: Application): void {
    const stepControllers = getSteps().map((step: Step) => {
      const stepDir = `${__dirname}/../../steps/screen-questions/${step.id}`;
      const view = `${stepDir}/template.njk`;
      const { generateContent, form } = require(`${stepDir}/content.ts`);

      return {
        [`${step.id}StepGetController`]: asValue(
          new GetController(fs.existsSync(view) ? view : `${stepDir}/../template.njk`, generateContent(step.title))
        ),
        [`${step.id}StepPostController`]: asValue(new PostController(new Form(form))),
      };
    });

    const baseDependencies = {
      logger: asValue(logger),
      homeGetController: asValue(new HomeGetController()),
      termsAndConditionsGetController: asValue(new TermsAndConditionsGetController()),
      errorController: asClass(ErrorController),
    };
    const dependencies = Object.assign(baseDependencies, ...stepControllers);

    app.locals.container = createContainer({ injectionMode: InjectionMode.CLASSIC }).register(dependencies);
  }
}
