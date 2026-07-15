import path from 'path';

import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

export class SwitchToSoleApplicationGetController extends GetController {
  constructor() {
    super(path.resolve(process.cwd(), 'src/main/steps/switch-to-sole-application/template.njk'), generateContent);
  }
}
