import { GetController } from '../../app/controller/GetController';

import { termsAndConditionsContent } from './content';

export class TermsAndConditionsGetController extends GetController {
  constructor() {
    super(__dirname + '/template', termsAndConditionsContent);
  }
}
