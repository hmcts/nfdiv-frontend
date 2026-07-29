import { GetController } from '../../app/controller/GetController.js';
import { getStepTemplatePath } from '../getStepTemplatePath.js';

import { generateContent } from './content.js';

export class NoResponseYetApplicationGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('no-response-yet', 'template.njk'), generateContent);
  }
}
