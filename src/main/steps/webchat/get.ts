import path from 'path';

import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

export class WebChatGetController extends GetController {
  constructor() {
    super(path.resolve(process.cwd(), 'src/main/steps/webchat/template'), generateContent);
  }
}
