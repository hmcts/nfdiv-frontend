import { GetController } from '../../app/controller/GetController';
import { getStepTemplatePath } from '../getStepTemplatePath';

import { generateContent } from './content';

export class SwitchToSoleApplicationGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('switch-to-sole-application', 'template.njk'), generateContent);
  }
}
