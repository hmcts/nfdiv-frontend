import { GetController } from '../../app/controller/GetController.js';
import { getStepTemplatePath } from '../getStepTemplatePath.js';

import { generateContent } from './content.js';

export class CookiesGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('cookies', 'template'), generateContent);
  }
}
