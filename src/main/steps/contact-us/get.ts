import { GetController } from '../../app/controller/GetController.js';
import { getStepTemplatePath } from '../getStepTemplatePath.js';

import { generateContent } from './content.js';

export class ContactUsGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('contact-us', 'template'), generateContent);
  }
}
