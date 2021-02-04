import { GetController } from '../../../app/controller/GetController';

import { certificateContent } from './content';

export class CertificateGetController extends GetController {
  constructor() {
    super(__dirname + '/template', certificateContent);
  }
}
