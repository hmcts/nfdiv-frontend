import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { CITIZEN_SUBMIT } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import { addWelshTranslationUponSubmissionFormData } from '../../../app/controller/controller.utils';
import CheckYourAnswersPostController from '../check-your-answers/post';

@autobind
export default class Applicant1ConfirmYourJointApplicationPostController extends CheckYourAnswersPostController {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    return super.save(req, addWelshTranslationUponSubmissionFormData(formData, req.session), eventName);
  }

  protected getEventName(): string {
    return CITIZEN_SUBMIT;
  }
}
