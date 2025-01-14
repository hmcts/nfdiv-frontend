import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import CitizenUpdateContactDetailsPostController from '../../applicant1/check-phone-number/post';

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
