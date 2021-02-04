import { GetController } from '../../../app/controller/GetController';

import { noMarriageCertificateContent } from './content';

export class noMarriageCertificateGetController extends GetController {
  constructor() {
    super(__dirname + '/template', noMarriageCertificateContent);
  }
}
