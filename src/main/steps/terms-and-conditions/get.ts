import { GetController } from '../../app/controller/GetController';

import { TermsAndConditionsContent } from './content';

export class TermsAndConditionsGetController extends GetController {
  constructor() {
    super(__dirname + '/template', TermsAndConditionsContent);
  }
}
