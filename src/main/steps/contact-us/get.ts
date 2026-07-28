import { GetController } from '../../app/controller/GetController';
import { getStepTemplatePath } from '../getStepTemplatePath';

import { generateContent } from './content';

export class ContactUsGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('contact-us', 'template'), generateContent);
  }
}
