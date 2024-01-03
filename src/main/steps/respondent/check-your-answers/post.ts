import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case, CaseWithId, Checkbox } from '../../../app/case/case';
import { SUBMIT_AOS, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';

@autobind
export default class RespondentCheckYourAnswersPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.session.lang === 'cy') {
      formData.applicant2UsedWelshTranslationOnSubmission = YesOrNo.YES;
    }

    return super.save(req, formData, eventName);
  }

  protected async saveAndSignOut(
    req: AppRequest<AnyObject>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    // Force delete aosStatementOfTruth if user signs out to avoid causing an infinite loop with getNextSteps check
    formData.aosStatementOfTruth = Checkbox.Unchecked;

    return super.saveAndSignOut(req, res, form, formData);
  }

  protected getEventName(): string {
    return SUBMIT_AOS;
  }
}
