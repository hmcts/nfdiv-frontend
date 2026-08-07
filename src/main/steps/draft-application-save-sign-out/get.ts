import EndSessionGetController from '../../app/controller/EndSessionGetController.js';
import autobind from '../../app/utils/autobind.js';
import { getStepTemplatePath } from '../getStepTemplatePath.js';
import { DRAFT_SAVE_AND_SIGN_OUT, PageLink } from '../urls.js';

import { generateContent } from './content.js';

@autobind
export class DraftApplicationSaveSignOutGetController extends EndSessionGetController {
  constructor() {
    super(getStepTemplatePath('draft-application-save-sign-out', 'template'), generateContent);
  }

  protected signoutPagePath(): PageLink {
    return DRAFT_SAVE_AND_SIGN_OUT;
  }
}
