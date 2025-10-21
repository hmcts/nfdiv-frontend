import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../../../app/case/case';
import { YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default class NewPostalAddressPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.session.isApplicant2) {
      // formData.applicant2NoResponsePartnerAddressOverseas ??= YesOrNo.NO;
    } else {
      formData.applicant1NoResponsePartnerAddressOverseas ??= YesOrNo.NO;
    }
    return super.save(req, formData, eventName);
  }
}
