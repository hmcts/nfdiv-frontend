import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

export class ExistingApplicationGetController extends GetController {
  constructor() {
    super(`${__dirname}/../common/template`, generateContent);
  }
}
