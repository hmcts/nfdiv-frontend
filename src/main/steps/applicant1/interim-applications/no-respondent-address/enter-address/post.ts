import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../../../app/case/case';
import { CITIZEN_UPDATE, YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default class EnterTheirAddressPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    formData.applicant2AddressOverseas ??= YesOrNo.NO;
    return super.save(req, formData, eventName);
  }

  protected getEventName(): string {
    return CITIZEN_UPDATE;
  }
}
