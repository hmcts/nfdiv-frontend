import autobind from 'autobind-decorator';

import EndSessionGetController from '../../app/controller/EndSessionGetController';
import { DRAFT_SAVE_AND_SIGN_OUT, PageLink } from '../urls';

import { generateContent } from './content';

@autobind
export class DraftApplicationSaveSignOutGetController extends EndSessionGetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  protected signoutPagePath(): PageLink {
    return DRAFT_SAVE_AND_SIGN_OUT;
  }
}
