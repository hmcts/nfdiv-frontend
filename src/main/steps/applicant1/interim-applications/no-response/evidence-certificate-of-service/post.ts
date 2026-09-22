import { CITIZEN_EVIDENCE_CERTIFICATE_OF_SERVICE } from '../../../../../app/case/definition.js';
import { AnyObject, PostController } from '../../../../../app/controller/PostController.js';
import autobind from '../../../../../app/utils/autobind.js';

@autobind
export default class CertificateOfServiceEvidencePostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return CITIZEN_EVIDENCE_CERTIFICATE_OF_SERVICE;
  }
}
