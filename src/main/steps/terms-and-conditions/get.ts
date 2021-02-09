import { GetController } from '../../app/controller/GetController';

import { getTermsAndConditionsContent } from './content';

export class TermsAndConditionsGetController extends GetController {
  constructor() {
    super(__dirname + '/template', getTermsAndConditionsContent);
  }
}
