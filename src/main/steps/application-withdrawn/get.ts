import autobind from 'autobind-decorator';

import { generateContent } from './content';
import BaseEndSessionGetController from '../../app/controller/BaseEndSessionGetController';
import { APPLICATION_WITHDRAWN } from '../../steps/urls';

@autobind
export class ApplicationWithdrawnGetController extends BaseEndSessionGetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  protected signoutPagePath() {
    return APPLICATION_WITHDRAWN;
  }
}
