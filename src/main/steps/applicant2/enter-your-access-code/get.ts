import { GetController } from '../../../app/controller/GetController';

import { generateContent } from './content';

export class Applicant2AccessCodeGetController extends GetController {
  constructor() {
    super(__dirname + '/template.njk', generateContent);
  }
}
