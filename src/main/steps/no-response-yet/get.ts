import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

export class NoResponseYetApplicationGetController extends GetController {
  constructor() {
    super(__dirname + '/template.njk', generateContent);
  }
}
