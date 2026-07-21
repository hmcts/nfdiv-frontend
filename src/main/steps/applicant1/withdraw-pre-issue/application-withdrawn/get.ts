import autobind from 'autobind-decorator';

import EndSessionGetController from '../../../../app/controller/EndSessionGetController';
import { PageLink, WITHDRAW_CONFIRMATION } from '../../../urls';

import { generateContent } from './content';
@autobind
export class ApplicationWithdrawnPreIssueGetController extends EndSessionGetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  protected signoutPagePath(): PageLink {
    return WITHDRAW_CONFIRMATION;
  }
}
