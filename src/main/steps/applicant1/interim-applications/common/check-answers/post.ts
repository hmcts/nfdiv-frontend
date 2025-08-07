import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case, CaseWithId } from '../../../../../app/case/case';
import { InterimApplicationType } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { getErroredStepUrlForSequence } from '../../../../index';
import { Step } from '../../../../../steps/applicant1Sequence';

@autobind
export default class CheckAnswersPostController<T extends AnyObject> extends PostController<AnyObject> {
  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    const erroredPageUrl = getErroredStepUrlForSequence(req, this.getApplicationSequence());

    if (erroredPageUrl && !req.originalUrl.includes(erroredPageUrl)) {
      return res.redirect(erroredPageUrl);
    }

    return super.post(req, res);
  }

  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (!req.session.isApplicant2) {
      formData.applicant1InterimApplicationType = this.getApplicationType();
    }
    return super.save(req, formData, eventName);
  }

  protected getEventName(): string {
    throw new Error('Method not implemented. This should be overridden in subclasses.');
  }

  protected getApplicationType(): InterimApplicationType {
    throw new Error('Method not implemented. This should be overridden in subclasses.');
  }

  protected getApplicationSequence(): Step[] {
    throw new Error('Method not implemented. This should be overridden in subclasses.');
  }
}
