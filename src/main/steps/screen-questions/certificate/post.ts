import { PostController } from '../../../app/controller/PostController';
import { NO_CERTIFICATE_URL } from '../../urls';

import { CertificateForm } from './content';

export class CertificatePostController extends PostController<CertificateForm> {
  protected getNextStep(body: Record<string, unknown>): string {
    return body.screenHasCertificate === 'Yes' ? '/' : NO_CERTIFICATE_URL;
  }
}
