import autobind from 'autobind-decorator';

import { generateContent } from './content';
import { WITHDRAW_CONFIRMATION } from '../../../urls';
import BaseEndSessionGetController from '../../../../app/controller/BaseEndSessionGetController';
@autobind
export class ApplicationWithdrawnPreIssueGetController extends BaseEndSessionGetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  protected signoutPagePath() {
    return WITHDRAW_CONFIRMATION;
  }
}
