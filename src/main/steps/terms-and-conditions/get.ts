import { GetController } from '../../app/controller/GetController.js';
import { getStepTemplatePath } from '../getStepTemplatePath.js';

import { generateContent } from './content.js';

export class TermsAndConditionsGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('terms-and-conditions', 'template'), generateContent);
  }
}
