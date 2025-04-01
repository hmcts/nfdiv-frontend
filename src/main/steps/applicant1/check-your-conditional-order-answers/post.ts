import autobind from 'autobind-decorator';
import { Response } from 'express';
import { isEmpty } from 'lodash';

import { Case, CaseWithId } from '../../../app/case/case';
import { ApplicationType, SUBMIT_CONDITIONAL_ORDER, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { APPLICANT_2, REVIEW_YOUR_APPLICATION, REVIEW_YOUR_JOINT_APPLICATION } from '../../urls';

@autobind
export default class CheckYourConditionalOrderAnswersPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.session.lang === 'cy') {
      if (req.session.isApplicant2) {
        formData.applicant2UsedWelshTranslationOnSubmission = YesOrNo.YES;
      } else {
        formData.applicant1UsedWelshTranslationOnSubmission = YesOrNo.YES;
      }
    }

    return super.save(req, formData, eventName);
  }

  protected async saveAndContinue(
    req: AppRequest<AnyObject>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);
    if (req.session.errors.length === 0) {
      try {
        if (
          req.session.isApplicant2 &&
          req.session.userCase.applicant2ConfirmInformationStillCorrect !== YesOrNo.YES &&
          isEmpty(req.session.userCase.applicant2ReasonInformationNotCorrect)
        ) {
          res.redirect(APPLICANT_2 + REVIEW_YOUR_JOINT_APPLICATION);
        } else if (
          !req.session.isApplicant2 &&
          req.session.userCase.applicant1ConfirmInformationStillCorrect !== YesOrNo.YES &&
          isEmpty(req.session.userCase.applicant1ReasonInformationNotCorrect)
        ) {
          res.redirect(
            req.session.userCase.applicationType === ApplicationType.JOINT_APPLICATION
              ? REVIEW_YOUR_JOINT_APPLICATION
              : REVIEW_YOUR_APPLICATION
          );
        } else {
          req.session.userCase = await this.save(req, formData, SUBMIT_CONDITIONAL_ORDER);
        }
      } catch (err) {
        req.locals.logger.error('Error saving', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }
    this.saveSessionAndRedirect(req, res);
  }

  protected getEventName(): string {
    return SUBMIT_CONDITIONAL_ORDER;
  }
}
