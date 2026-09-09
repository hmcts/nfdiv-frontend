import { Case, CaseWithId } from '../../../../../app/case/case.js';
import { CITIZEN_GENERATE_PROCESS_SERVER_DOCS, InterimApplicationType } from '../../../../../app/case/definition.js';
import { AppRequest } from '../../../../../app/controller/AppRequest.js';
import { AnyObject, PostController } from '../../../../../app/controller/PostController.js';
import autobind from '../../../../../app/utils/autobind.js';

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
