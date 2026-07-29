import { GetController } from '../../app/controller/GetController.js';
import { getStepTemplatePath } from '../getStepTemplatePath.js';

import { generateContent } from './content.js';

export class PrivacyPolicyGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('privacy-policy', 'template'), generateContent);
  }
}
