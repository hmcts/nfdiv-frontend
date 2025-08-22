import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../../../app/case/case';
import { CITIZEN_GENERATE_PROCESS_SERVER_DOCS, InterimApplicationType } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default class ProcessServerPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    formData.applicant1InterimApplicationType = InterimApplicationType.PROCESS_SERVER_SERVICE;

    return super.save(req, formData, eventName);
  }

  protected getEventName(): string {
    return CITIZEN_GENERATE_PROCESS_SERVER_DOCS;
  }
}
