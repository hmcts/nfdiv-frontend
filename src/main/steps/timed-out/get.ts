import autobind from 'autobind-decorator';

import EndSessionGetController from '../../app/controller/EndSessionGetController';
import { PageLink, TIMED_OUT_URL } from '../urls';

import { generateContent } from './content';

@autobind
export class TimedOutGetController extends EndSessionGetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  protected signoutPagePath(): PageLink {
    return TIMED_OUT_URL;
  }
}
