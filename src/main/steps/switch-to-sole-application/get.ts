import { GetController } from '../../app/controller/GetController';
import { SWITCH_TO_SOLE_APPLICATION } from '../urls';

import { generateContent } from './content';

export class SwitchToSoleApplicationGetController extends GetController {
  constructor() {
    super(__dirname + '/template.njk', generateContent, SWITCH_TO_SOLE_APPLICATION);
  }
}
