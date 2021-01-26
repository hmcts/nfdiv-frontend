import { InjectionMode, asClass, asValue, createContainer } from 'awilix';
import { Application } from 'express';

import { Form } from '../../app/form/Form';
import { ErrorController } from '../../steps/error/error.controller';
import { firstPageContent } from '../../steps/first-page/first-page.content';
import { FirstPageGet } from '../../steps/first-page/first-page.get';
import { FirstPagePost } from '../../steps/first-page/first-page.post';
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
      // TODO create form when first page is implemented as of now its just a link and this post is not used
      firstPagePostController: asValue(new FirstPagePost(new Form(firstPageContent['en']['forms']))),
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
      errorController: asClass(ErrorController),
      exposeErrors: asValue(app.locals.developmentMode),
    });
  }
}
