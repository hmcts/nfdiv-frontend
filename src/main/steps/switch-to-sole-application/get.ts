import { fileURLToPath } from 'node:url';

import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

export class SwitchToSoleApplicationGetController extends GetController {
  constructor() {
    super(fileURLToPath(new URL('./template.njk', import.meta.url)), generateContent);
  }
}
