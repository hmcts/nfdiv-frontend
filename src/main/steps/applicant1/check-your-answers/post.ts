import autobind from 'autobind-decorator';

import { ApplicationType, CITIZEN_INVITE_APPLICANT_2, CITIZEN_SUBMIT } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class CheckYourAnswersPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    return req.body.applicationType === ApplicationType.JOINT_APPLICATION ? CITIZEN_INVITE_APPLICANT_2 : CITIZEN_SUBMIT;
  }
}
