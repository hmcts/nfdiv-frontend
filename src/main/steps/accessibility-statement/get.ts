import { GetController } from '../../app/controller/GetController';
import { getStepTemplatePath } from '../getStepTemplatePath';

import { generateContent } from './content';

export class AccessibilityStatementGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('accessibility-statement', 'template'), generateContent);
  }
}
