import { fileURLToPath } from 'node:url';

import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

export class WebChatGetController extends GetController {
  constructor() {
    super(fileURLToPath(new URL('./template', import.meta.url)), generateContent);
  }
}
