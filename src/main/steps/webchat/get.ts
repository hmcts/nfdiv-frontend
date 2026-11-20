import { GetController } from '../../app/controller/GetController';
import { WEBCHAT_URL } from '../urls';

import { generateContent } from './content';

export class WebChatGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent, WEBCHAT_URL);
  }
}
