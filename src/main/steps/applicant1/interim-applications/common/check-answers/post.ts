import { Response } from 'express';

import { Case, CaseWithId } from '../../../../../app/case/case.js';
import { InterimApplicationType } from '../../../../../app/case/definition.js';
import { AppRequest } from '../../../../../app/controller/AppRequest.js';
import { AnyObject, PostController } from '../../../../../app/controller/PostController.js';
import autobind from '../../../../../app/utils/autobind.js';
import { Step } from '../../../../../steps/applicant1Sequence.js';
import { getFirstErroredStep } from '../../../../index.js';

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
    if (!req.session.isApplicant2) {
      formData.applicant1InterimApplicationType = this.interimApplicationType();
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
