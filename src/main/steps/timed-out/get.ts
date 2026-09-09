import EndSessionGetController from '../../app/controller/EndSessionGetController.js';
import autobind from '../../app/utils/autobind.js';
import { getStepTemplatePath } from '../getStepTemplatePath.js';
import { PageLink, TIMED_OUT_URL } from '../urls.js';

import { generateContent } from './content.js';

@autobind
export class TimedOutGetController extends EndSessionGetController {
  constructor() {
    super(getStepTemplatePath('timed-out', 'template'), generateContent);
  }

  protected signoutPagePath(): PageLink {
    return TIMED_OUT_URL;
  }
}
