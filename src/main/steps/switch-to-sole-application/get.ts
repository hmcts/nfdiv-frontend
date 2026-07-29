import { GetController } from '../../app/controller/GetController.js';
import { getStepTemplatePath } from '../getStepTemplatePath.js';

import { generateContent } from './content.js';

export class SwitchToSoleApplicationGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('switch-to-sole-application', 'template.njk'), generateContent);
  }
}
