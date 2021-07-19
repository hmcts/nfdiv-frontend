import { GetController } from '../../../app/controller/GetController';

import { generateContent } from './content';

export class AccessCodeGetController extends GetController {
  constructor() {
    super(__dirname + '/../../common/template.njk', generateContent);
  }
}
