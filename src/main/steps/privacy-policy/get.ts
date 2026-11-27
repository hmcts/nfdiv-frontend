import { GetController } from '../../app/controller/GetController';
import { PRIVACY_POLICY_URL } from '../urls';

import { generateContent } from './content';

export class PrivacyPolicyGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent, PRIVACY_POLICY_URL);
  }
}
