import { Case, CaseWithId } from '../../../app/case/case.js';
import { YesOrNo } from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';
import CitizenUpdateContactDetailsPostController from '../check-phone-number/post.js';

@autobind
export default class CitizenUpdateContactDetailsPostControllerWithRefuge extends CitizenUpdateContactDetailsPostController {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    const setInRefugeDefault =
      req.session.userCase.applicant1AddressPrivate === YesOrNo.NO ||
      req.session.userCase.applicant1InRefuge === undefined
        ? { applicant1InRefuge: YesOrNo.NO }
        : {};

    return req.locals.api.triggerEvent(req.session.userCase.id, { ...formData, ...setInRefugeDefault }, eventName);
  }
}
