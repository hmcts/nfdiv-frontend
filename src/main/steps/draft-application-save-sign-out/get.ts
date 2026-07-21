import autobind from 'autobind-decorator';

import BaseEndSessionGetController from '../../app/controller/BaseEndSessionGetController';

import { generateContent } from './content';
import { DRAFT_SAVE_AND_SIGN_OUT } from '../urls';
import { AppRequest } from '../../app/controller/AppRequest';

@autobind
export class DraftApplicationSaveSignOutGetController extends BaseEndSessionGetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  protected signoutPagePath() {
    return DRAFT_SAVE_AND_SIGN_OUT;
  }
}
