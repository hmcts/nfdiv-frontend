import { GetController } from '../../app/controller/GetController';
import { NO_RESPONSE_YET } from '../urls';

import { generateContent } from './content';

export class NoResponseYetApplicationGetController extends GetController {
  constructor() {
    super(__dirname + '/template.njk', generateContent, NO_RESPONSE_YET);
  }
}
