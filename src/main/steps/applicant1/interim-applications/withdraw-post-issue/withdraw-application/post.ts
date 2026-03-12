import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../../../app/case/case';
import { GeneralApplicationType } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default class InitiateD11WithdrawApplicationPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    formData.applicant1GenAppType = GeneralApplicationType.WITHDRAW_POST_ISSUE;
    return super.save(req, formData, eventName);
  }
}
