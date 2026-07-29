import { Case, CaseWithId } from '../../../app/case/case.js';
import { YesOrNo } from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';
import CitizenUpdateContactDetailsPostController from '../../applicant1/check-phone-number/post.js';

@autobind
export default class CitizenUpdateContactDetailsPostControllerApp2WithRefuge extends CitizenUpdateContactDetailsPostController {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    const setInRefugeDefault =
      req.session.userCase.applicant2AddressPrivate === YesOrNo.NO ||
      req.session.userCase.applicant2InRefuge === undefined
        ? { applicant2InRefuge: YesOrNo.NO }
        : {};

    return req.locals.api.triggerEvent(req.session.userCase.id, { ...formData, ...setInRefugeDefault }, eventName);
  }
}
