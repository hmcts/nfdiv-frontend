import { GetController } from '../../../../../app/controller/GetController';

import { generateContent } from './content';

export class PartnerContactDetailsUpdatedGetController extends GetController {
  constructor() {
    super(__dirname + '/template.njk', generateContent);
  }
}
