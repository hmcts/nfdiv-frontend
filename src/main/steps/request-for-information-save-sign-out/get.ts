import EndSessionGetController from '../../app/controller/EndSessionGetController.js';
import autobind from '../../app/utils/autobind.js';
import { getStepTemplatePath } from '../getStepTemplatePath.js';
import { PageLink, REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT } from '../urls.js';

import { generateContent } from './content.js';

@autobind
export class RequestForInformationSaveSignOutGetController extends EndSessionGetController {
  constructor() {
    super(getStepTemplatePath('request-for-information-save-sign-out', 'template'), generateContent);
  }

  protected signoutPagePath(): PageLink {
    return REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT;
  }
}
