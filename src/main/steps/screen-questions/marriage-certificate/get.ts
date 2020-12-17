import { GetController } from '../../../app/controller/GetController';
import { marriageCertificateContent } from './content';

export class MarriageCertificateGetController extends GetController {

  constructor() {
    super(__dirname + '/template', marriageCertificateContent);
  }

}
