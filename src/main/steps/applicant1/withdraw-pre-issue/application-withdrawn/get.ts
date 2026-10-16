import EndSessionGetController from '../../../../app/controller/EndSessionGetController.js';
import autobind from '../../../../app/utils/autobind.js';
import { getStepTemplatePath } from '../../../getStepTemplatePath.js';
import { PageLink, WITHDRAW_CONFIRMATION } from '../../../urls.js';

import { generateContent } from './content.js';

@autobind
export class ApplicationWithdrawnPreIssueGetController extends EndSessionGetController {
  constructor() {
    super(getStepTemplatePath('applicant1/withdraw-pre-issue/application-withdrawn', 'template'), generateContent);
  }

  protected signoutPagePath(): PageLink {
    return WITHDRAW_CONFIRMATION;
  }
}
