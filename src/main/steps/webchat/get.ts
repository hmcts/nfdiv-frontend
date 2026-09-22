import { GetController } from '../../app/controller/GetController.js';
import { getStepTemplatePath } from '../getStepTemplatePath.js';

import { generateContent } from './content.js';

export class WebChatGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('webchat', 'template'), generateContent);
  }
}
