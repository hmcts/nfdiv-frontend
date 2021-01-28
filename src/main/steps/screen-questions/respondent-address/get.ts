import { GetController } from '../../../app/controller/GetController';

import { respondentAddressContent } from './content';

export class RespondentAddressGetController extends GetController {
  constructor() {
    super(__dirname + '/template', respondentAddressContent);
  }
}
