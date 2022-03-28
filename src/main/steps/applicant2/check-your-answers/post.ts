import { Case, CaseWithId } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

export default class Applicant2CheckYourAnswersPostController extends PostController<AnyObject> {
  /**
   * Force some fields to be set in the form data so they can be used in the to-api-format converters
   */
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    formData.divorceOrDissolution = req.session.userCase.divorceOrDissolution;
    formData.applicant2WhoIsFinancialOrderFor = req.session.userCase.applicant2WhoIsFinancialOrderFor;

    return req.locals.api.triggerEvent(req.session.userCase.id, formData, eventName);
  }
}
