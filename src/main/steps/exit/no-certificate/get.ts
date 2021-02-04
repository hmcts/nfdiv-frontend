import { GetController } from '../../../app/controller/GetController';

import { noCertificateContent } from './content';

export class noCertificateGetController extends GetController {
  constructor() {
    super(__dirname + '/template', noCertificateContent);
  }
}
