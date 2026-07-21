import autobind from 'autobind-decorator';

import { TIMED_OUT_URL } from '../urls';

import { generateContent } from './content';
import BaseEndSessionGetController from 'app/controller/BaseEndSessionGetController';

@autobind
export class TimedOutGetController extends BaseEndSessionGetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  protected signoutPagePath() {
    return TIMED_OUT_URL;
  }
}
