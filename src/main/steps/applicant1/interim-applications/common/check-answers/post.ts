import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case, CaseWithId } from '../../../../../app/case/case';
import { InterimApplicationType } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { canStartNewGeneralApplication } from '../../../../../app/utils/general-application-utils';
import { Step } from '../../../../../steps/applicant1Sequence';
import { getFirstErroredStep } from '../../../../index';

@autobind
export default abstract class CheckAnswersPostController extends PostController<AnyObject> {
  public async post(req: AppRequest, res: Response): Promise<void> {
    const erroredPageUrl = getFirstErroredStep(req, this.interimApplicationSequence());

    if (erroredPageUrl && !req.originalUrl.includes(erroredPageUrl)) {
      return res.redirect(erroredPageUrl);
    }

    return super.post(req, res);
  }

  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.session.isApplicant2) {
      formData.applicant2InterimApplicationType = this.interimApplicationType();
    } else {
      formData.applicant1InterimApplicationType = this.interimApplicationType();
    }

    const interimApplicationType = req.session.isApplicant2
      ? formData.applicant2InterimApplicationType
      : formData.applicant1InterimApplicationType;

    if (interimApplicationType === InterimApplicationType.DIGITISED_GENERAL_APPLICATION_D11) {
      const canSubmitD11Application = canStartNewGeneralApplication(req.session.isApplicant2, req.session.userCase);
      if (!canSubmitD11Application) {
        throw new Error('Cannot submit a D11 application when there is an existing application in progress');
      }
    }

    return super.save(req, formData, eventName);
  }

  protected getEventName(): string {
    throw new Error('Method not implemented. This should be overridden in subclasses.');
  }

  protected interimApplicationType(): InterimApplicationType {
    throw new Error('Method not implemented. This should be overridden in subclasses.');
  }

  protected interimApplicationSequence(): Step[] {
    throw new Error('Method not implemented. This should be overridden in subclasses.');
  }
}
