import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../../../app/case/case';
import { CITIZEN_START_INTERIM_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default abstract class StartInterimApplicationPostController<T extends AnyObject> extends PostController<T> {
  protected async save(req: AppRequest<T>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.session.isApplicant2) {
      formData.applicant2InterimApplicationType = this.interimApplicationType();
    } else {
      formData.applicant1InterimApplicationType = this.interimApplicationType();
    }

    return super.save(req, formData, eventName);
  }

  protected getEventName(req: AppRequest<T>): string {
    const userCase = req.session.userCase;
    const applicationType = req.session.isApplicant2
      ? userCase?.applicant2InterimApplicationType
      : userCase?.applicant1InterimApplicationType;

    const applicationTypeHasChanged = applicationType !== this.interimApplicationType();

    if (applicationTypeHasChanged) {
      return CITIZEN_START_INTERIM_APPLICATION;
    } else {
      return super.getEventName(req);
    }
  }

  protected interimApplicationType(): InterimApplicationType {
    throw new Error('Method not implemented. This should be overridden in subclasses.');
  }
}
