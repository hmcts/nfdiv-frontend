import { GetController } from '../../app/controller/GetController';
import { getStepTemplatePath } from '../getStepTemplatePath';

import { generateContent } from './content';

export class WebChatGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('webchat', 'template'), generateContent);
  }
}
