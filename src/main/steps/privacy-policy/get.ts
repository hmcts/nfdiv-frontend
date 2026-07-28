import { GetController } from '../../app/controller/GetController';
import { getStepTemplatePath } from '../getStepTemplatePath';

import { generateContent } from './content';

export class PrivacyPolicyGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('privacy-policy', 'template'), generateContent);
  }
}
