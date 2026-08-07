import EndSessionGetController from '../../app/controller/EndSessionGetController.js';
import autobind from '../../app/utils/autobind.js';
import { APPLICATION_WITHDRAWN, PageLink } from '../../steps/urls.js';
import { getStepTemplatePath } from '../getStepTemplatePath.js';

import { generateContent } from './content.js';

@autobind
export class ApplicationWithdrawnGetController extends EndSessionGetController {
  constructor() {
    super(getStepTemplatePath('application-withdrawn', 'template'), generateContent);
  }

  protected signoutPagePath(): PageLink {
    return APPLICATION_WITHDRAWN;
  }
}
