import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

export class WithdrawApplicationGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }
}
