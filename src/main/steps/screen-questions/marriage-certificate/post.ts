import { PostController } from '../../../app/controller/PostController';
import { NO_CERTIFICATE_URL } from '../../urls';

import { MarriageCertificateForm } from './content';

export class MarriageCertificatePostController extends PostController<MarriageCertificateForm> {
  protected getNextStep(body: Record<string, unknown>): string {
    return body.screenHasMarriageCert === 'Yes' ? '/' : NO_CERTIFICATE_URL;
  }
}
