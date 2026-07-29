import { Case, CaseWithId } from '../../../app/case/case.js';
import {
  APPLICANT_1_RESUBMIT,
  ApplicationType,
  CITIZEN_SUBMIT,
  INVITE_APPLICANT_2,
  State,
  YesOrNo,
} from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject, PostController } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';

@autobind
export default class CheckYourAnswersPostController extends PostController<AnyObject> {
  /**
   * Force some fields to be set in the form data so they can be used in the to-api-format converters
   */
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    formData.divorceOrDissolution = req.session.userCase.divorceOrDissolution;
    formData.applicant1ApplyForFinancialOrder = req.session.userCase.applicant1ApplyForFinancialOrder;
    formData.applicant1WhoIsFinancialOrderFor = req.session.userCase.applicant1WhoIsFinancialOrderFor;

    if (req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION && req.session.lang === 'cy') {
      formData.applicant1UsedWelshTranslationOnSubmission = YesOrNo.YES;
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
