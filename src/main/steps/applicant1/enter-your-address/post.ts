import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import CitizenUpdateContactDetailsPostController from '../check-phone-number/post';

@autobind
export default class EnterYourAddressPostController extends CitizenUpdateContactDetailsPostController {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.session.isApplicant2) {
      formData.applicant2AddressOverseas ??= YesOrNo.NO;
    } else {
      formData.applicant1AddressOverseas ??= YesOrNo.NO;
    }
    return super.save(req, formData, eventName);
  }
}
