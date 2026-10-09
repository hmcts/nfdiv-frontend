import { GetController } from '../../app/controller/GetController.js';
import { getStepTemplatePath } from '../getStepTemplatePath.js';

import { generateContent } from './content.js';

export class AccessibilityStatementGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('accessibility-statement', 'template'), generateContent);
  }
}
