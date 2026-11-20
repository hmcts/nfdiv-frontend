import { GetController } from '../../app/controller/GetController';
import { ACCESSIBILITY_STATEMENT_URL } from '../urls';

import { generateContent } from './content';

export class AccessibilityStatementGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent, ACCESSIBILITY_STATEMENT_URL);
  }
}
