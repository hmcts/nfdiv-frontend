import { GetController } from '../../app/controller/GetController';

import { privacyPolicyContent } from './content';

export class PrivacyPolicyGetController extends GetController {
  constructor() {
    super(__dirname + '/template', privacyPolicyContent);
  }
}
