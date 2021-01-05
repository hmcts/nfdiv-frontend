import Ajv from 'ajv';
import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import { Application } from 'express';
import { ErrorController } from '../../steps/error/error.controller';
import { HomeGetController } from '../../steps/home/get';
import { FirstPageGet } from '../../steps/first-page/first-page.get';
import { FirstPagePost } from '../../steps/first-page/first-page.post';
import { Form } from '../../app/form/Form';
import { firstPageSchema } from '../../steps/first-page/first-page.form';
import { LanguagePreferenceGetController } from '../../steps/screen-questions/language-preference/get';
import { LanguagePreferencePostController } from '../../steps/screen-questions/language-preference/post';
import { languagePreferenceSchema } from '../../steps/screen-questions/language-preference/form';
import { hasMarriageBrokenSchema } from '../../steps/screen-questions/has-marriage-broken/form';
import { HasMarriageBrokenPostController } from '../../steps/screen-questions/has-marriage-broken/post';
import { HasMarriageBrokenGetController } from '../../steps/screen-questions/has-marriage-broken/get';
import { respondentAddressSchema } from '../../steps/screen-questions/respondent-address/form';
import { RespondentAddressPostController } from '../../steps/screen-questions/respondent-address/post';
import { RespondentAddressGetController } from '../../steps/screen-questions/respondent-address/get';
import { MarriageCertificateGetController } from '../../steps/screen-questions/marriage-certificate/get';
import { MarriageCertificatePostController } from '../../steps/screen-questions/marriage-certificate/post';
import { marriageCertificateSchema } from '../../steps/screen-questions/marriage-certificate/form';
import { homeContent } from 'steps/home/content';
import { languagePreferenceContent } from '../../steps/screen-questions/language-preference/content';
import { hasMarriageBrokenContent } from '../../steps/screen-questions/has-marriage-broken/content';
import { respondentAddressContent } from '../../steps/screen-questions/respondent-address/content';
import { marriageCertificateContent } from '../../steps/screen-questions/marriage-certificate/content';

const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('app');

/**
 * Sets up the dependency injection container
 */
export class Container {

  public enableFor(app: Application): void {
    const ajv = new Ajv({ verbose: true });

    app.locals.container = createContainer({ injectionMode: InjectionMode.CLASSIC }).register({
      logger: asValue(logger),
      homeGetController: asValue(new HomeGetController()),
      firstPageGetController: asValue(new FirstPageGet()),
      firstPagePostController: asValue(new FirstPagePost(new Form(ajv.compile(firstPageSchema)), homeContent)),
      languagePreferenceGetController: asValue(new LanguagePreferenceGetController()),
      languagePreferencePostController: asValue(new LanguagePreferencePostController(new Form(ajv.compile(languagePreferenceSchema)), languagePreferenceContent)),
      hasMarriageBrokenGetController: asValue(new HasMarriageBrokenGetController()),
      hasMarriageBrokenPostController: asValue(new HasMarriageBrokenPostController(new Form(ajv.compile(hasMarriageBrokenSchema)), hasMarriageBrokenContent)),
      respondentAddressGetController: asValue(new RespondentAddressGetController()),
      respondentAddressPostController: asValue(new RespondentAddressPostController(new Form(ajv.compile(respondentAddressSchema)), respondentAddressContent)),
      marriageCertificateGetController: asValue(new MarriageCertificateGetController()),
      marriageCertificatePostController: asValue(new MarriageCertificatePostController(new Form(ajv.compile(marriageCertificateSchema)), marriageCertificateContent)),
      errorController: asClass(ErrorController),
      exposeErrors: asValue(app.locals.developmentMode)
    });
  }

}
