import autobind from 'autobind-decorator';

import EndSessionGetController from '../../app/controller/EndSessionGetController';
import { APPLICATION_WITHDRAWN, PageLink } from '../../steps/urls';

import { generateContent } from './content';

@autobind
export class ApplicationWithdrawnGetController extends EndSessionGetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  protected signoutPagePath(): PageLink {
    return APPLICATION_WITHDRAWN;
  }
}
