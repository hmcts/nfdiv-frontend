import autobind from 'autobind-decorator';

import EndSessionGetController from '../../app/controller/EndSessionGetController';
import { PageLink, REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT } from '../urls';

import { generateContent } from './content';

@autobind
export class RequestForInformationSaveSignOutGetController extends EndSessionGetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  protected signoutPagePath(): PageLink {
    return REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT;
  }
}
