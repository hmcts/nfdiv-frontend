import { GetController } from '../../app/controller/GetController';
import { getStepTemplatePath } from '../getStepTemplatePath';

import { generateContent } from './content';

export class TermsAndConditionsGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('terms-and-conditions', 'template'), generateContent);
  }
}
