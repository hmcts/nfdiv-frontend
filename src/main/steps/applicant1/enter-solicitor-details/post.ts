import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class EnterSolicitorDetailsPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (
      formData.applicant2SolicitorEmail ||
      (formData.applicant2SolicitorAddressPostcode && formData.applicant2SolicitorFirmName) ||
      (formData.applicant2SolicitorAddressPostcode && formData.applicant2SolicitorAddress1)
    ) {
      formData.applicant2SolicitorRepresented = YesOrNo.YES;
      formData.applicant2SolicitorAddressOverseas ??= YesOrNo.NO;
    } else {
      formData.applicant2SolicitorRepresented = YesOrNo.NO;
      formData.applicant2SolicitorAddressOverseas = undefined;
    }

    return req.locals.api.triggerEvent(req.session.userCase.id, formData, eventName);
  }
}
