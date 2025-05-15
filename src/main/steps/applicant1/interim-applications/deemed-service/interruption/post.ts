import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../../../app/case/case';
import { GeneralApplicationType } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default class DeemedInterruptionPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (!req.session.isApplicant2) {
      formData.applicant1GeneralApplicationType = GeneralApplicationType.DEEMED_SERVICE;
    }
    return super.save(req, formData, eventName);
  }
}
