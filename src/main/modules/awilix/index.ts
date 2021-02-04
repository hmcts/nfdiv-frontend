import { InjectionMode, asClass, asValue, createContainer } from 'awilix';
import { Application } from 'express';
import type { LoggerInstance } from 'winston';

import { Form } from '../../app/form/Form';
import { ErrorController } from '../../steps/error/error.controller';
import { noMarriageCertificateGetController } from '../../steps/exit/no-marriage-certificate/get';
import { HomeGetController } from '../../steps/home/get';
import { hasMarriageBrokenForm } from '../../steps/screen-questions/has-marriage-broken/content';
import { HasMarriageBrokenGetController } from '../../steps/screen-questions/has-marriage-broken/get';
import { HasMarriageBrokenPostController } from '../../steps/screen-questions/has-marriage-broken/post';
import { languagePreferenceForm } from '../../steps/screen-questions/language-preference/content';
import { LanguagePreferenceGetController } from '../../steps/screen-questions/language-preference/get';
import { LanguagePreferencePostController } from '../../steps/screen-questions/language-preference/post';
import { marriageCertificateForm } from '../../steps/screen-questions/marriage-certificate/content';
import { MarriageCertificateGetController } from '../../steps/screen-questions/marriage-certificate/get';
import { MarriageCertificatePostController } from '../../steps/screen-questions/marriage-certificate/post';
import { respondentAddressForm } from '../../steps/screen-questions/respondent-address/content';
import { RespondentAddressGetController } from '../../steps/screen-questions/respondent-address/get';
import { RespondentAddressPostController } from '../../steps/screen-questions/respondent-address/post';
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
      termsAndConditionsGetController: asValue(new TermsAndConditionsGetController()),
      languagePreferenceGetController: asValue(new LanguagePreferenceGetController()),
      languagePreferencePostController: asValue(new LanguagePreferencePostController(new Form(languagePreferenceForm))),
      hasMarriageBrokenGetController: asValue(new HasMarriageBrokenGetController()),
      hasMarriageBrokenPostController: asValue(new HasMarriageBrokenPostController(new Form(hasMarriageBrokenForm))),
      respondentAddressGetController: asValue(new RespondentAddressGetController()),
      respondentAddressPostController: asValue(new RespondentAddressPostController(new Form(respondentAddressForm))),
      marriageCertificateGetController: asValue(new MarriageCertificateGetController()),
      marriageCertificatePostController: asValue(
        new MarriageCertificatePostController(new Form(marriageCertificateForm))
      ),
      noMarriageCertificateGetController: asValue(new noMarriageCertificateGetController()),
      errorController: asClass(ErrorController),
    });
  }
}
