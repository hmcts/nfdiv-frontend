import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import {
  APPLICANT_1_RESUBMIT,
  ApplicationType,
  CITIZEN_SUBMIT,
  INVITE_APPLICANT_2,
  State,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { addWelshTranslationUponSubmissionFormData } from '../../../app/controller/controller.utils';

@autobind
export default class CheckYourAnswersPostController extends PostController<AnyObject> {
  /**
   * Force some fields to be set in the form data so they can be used in the to-api-format converters
   */
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    formData.divorceOrDissolution = req.session.userCase.divorceOrDissolution;
    formData.applicant1ApplyForFinancialOrder = req.session.userCase.applicant1ApplyForFinancialOrder;
    formData.applicant1WhoIsFinancialOrderFor = req.session.userCase.applicant1WhoIsFinancialOrderFor;

    if (req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION) {
      return super.save(req, addWelshTranslationUponSubmissionFormData(formData, req.session), eventName);
    }

    return super.save(req, formData, eventName);
  }

  protected getEventName(req: AppRequest<AnyObject>): string {
    if (req.session.userCase.state === State.AwaitingApplicant1Response) {
      return APPLICANT_1_RESUBMIT;
    } else if (req.body.applicationType === ApplicationType.JOINT_APPLICATION) {
      return INVITE_APPLICANT_2;
    } else {
      return CITIZEN_SUBMIT;
    }
  }
}
