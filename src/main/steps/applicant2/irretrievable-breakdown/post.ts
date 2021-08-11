import autobind from 'autobind-decorator';

import { APPLICANT_2_NOT_BROKEN, CITIZEN_APPLICANT2_UPDATE, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class Applicant2IrretrievableBreakdownPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    return req.body.applicant2ScreenHasUnionBroken === YesOrNo.NO ? APPLICANT_2_NOT_BROKEN : CITIZEN_APPLICANT2_UPDATE;
  }
}
