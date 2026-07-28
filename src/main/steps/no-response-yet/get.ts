import { GetController } from '../../app/controller/GetController';
import { getStepTemplatePath } from '../getStepTemplatePath';

import { generateContent } from './content';

export class NoResponseYetApplicationGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('no-response-yet', 'template.njk'), generateContent);
  }
}
