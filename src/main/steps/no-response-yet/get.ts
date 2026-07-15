import path from 'path';

import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

export class NoResponseYetApplicationGetController extends GetController {
  constructor() {
    super(path.resolve(process.cwd(), 'src/main/steps/no-response-yet/template.njk'), generateContent);
  }
}
