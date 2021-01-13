import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import { Application } from 'express';
import { ErrorController } from '../../steps/error/error.controller';
import { HomeGetController } from '../../steps/home/get';
import { FirstPageGet } from '../../steps/first-page/first-page.get';
import { FirstPagePost } from '../../steps/first-page/first-page.post';
import { Form } from '../../app/form/Form';
import { LanguagePreferenceGetController } from '../../steps/screen-questions/language-preference/get';
import { LanguagePreferencePostController } from '../../steps/screen-questions/language-preference/post';
import { HasMarriageBrokenPostController } from '../../steps/screen-questions/has-marriage-broken/post';
import { HasMarriageBrokenGetController } from '../../steps/screen-questions/has-marriage-broken/get';
import { RespondentAddressPostController } from '../../steps/screen-questions/respondent-address/post';
import { RespondentAddressGetController } from '../../steps/screen-questions/respondent-address/get';
import { MarriageCertificateGetController } from '../../steps/screen-questions/marriage-certificate/get';
import { MarriageCertificatePostController } from '../../steps/screen-questions/marriage-certificate/post';
import { languagePreferenceForm } from '../../steps/screen-questions/language-preference/content';
import { firstPageContent } from '../../steps/first-page/first-page.content';
import { marriageCertificateForm } from '../../steps/screen-questions/marriage-certificate/content';
import { respondentAddressForm } from '../../steps/screen-questions/respondent-address/content';
import { hasMarriageBrokenForm } from '../../steps/screen-questions/has-marriage-broken/content';
import { AccessibilityStatementGetController } from '../../steps/accessibility-statement/get';

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
      accessibilityStatementGetController: asValue(new AccessibilityStatementGetController()),
      // TODO create form when first page is implemented as of now its just a link and this post is not used
      firstPagePostController: asValue(new FirstPagePost(new Form(firstPageContent['en']['forms']))),
      languagePreferenceGetController: asValue(new LanguagePreferenceGetController()),
      languagePreferencePostController: asValue(new LanguagePreferencePostController(new Form(languagePreferenceForm))),
      hasMarriageBrokenGetController: asValue(new HasMarriageBrokenGetController()),
      hasMarriageBrokenPostController: asValue(new HasMarriageBrokenPostController(new Form(hasMarriageBrokenForm))),
      respondentAddressGetController: asValue(new RespondentAddressGetController()),
      respondentAddressPostController: asValue(new RespondentAddressPostController(new Form(respondentAddressForm))),
      marriageCertificateGetController: asValue(new MarriageCertificateGetController()),
      marriageCertificatePostController: asValue(new MarriageCertificatePostController(new Form(marriageCertificateForm))),
      errorController: asClass(ErrorController),
      exposeErrors: asValue(app.locals.developmentMode)
    });
  }

}
