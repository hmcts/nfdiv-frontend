import { fileURLToPath } from 'node:url';

import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

export class PrivacyPolicyGetController extends GetController {
  constructor() {
    super(fileURLToPath(new URL('./template', import.meta.url)), generateContent);
  }
}
