import autobind from 'autobind-decorator';

import BaseEndSessionGetController from '../../app/controller/BaseEndSessionGetController';

import { generateContent } from './content';
import { REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT } from '../urls';

@autobind
export class RequestForInformationSaveSignOutGetController extends BaseEndSessionGetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  protected signoutPagePath() {
    return REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT;
  }
}
