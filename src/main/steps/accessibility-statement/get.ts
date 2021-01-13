import { GetController } from '../../app/controller/GetController';
import { AccessibilityStatementContent } from './content';

export class AccessibilityStatementGetController extends GetController {

  constructor() {
    super(__dirname + '/template', AccessibilityStatementContent);
  }

}
