import { Case, CaseWithId } from '../../../app/case/case.js';
import { YesOrNo } from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';
import CitizenUpdateContactDetailsPostController from '../check-phone-number/post.js';

@autobind
export default class EnterTheirAddressPostController extends CitizenUpdateContactDetailsPostController {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    formData.applicant2AddressOverseas ??= YesOrNo.NO;
    return super.save(req, formData, eventName);
  }
}
