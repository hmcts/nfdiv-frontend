import autobind from 'autobind-decorator';

import { CITIZEN_EVIDENCE_CERTIFICATE_OF_SERVICE } from '../../../../../app/case/definition';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default class CertificateOfServiceEvidencePostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return CITIZEN_EVIDENCE_CERTIFICATE_OF_SERVICE;
  }
}
