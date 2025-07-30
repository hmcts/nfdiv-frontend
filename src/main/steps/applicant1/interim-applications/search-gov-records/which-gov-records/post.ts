import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../../../app/case/case';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default class SearchGovWhichDepartmentPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    // const emptyOldFields = req.session.userCase.applicant1SearchGovRecordsWhichDepartments?.length
    //   ? { applicant1SearchGovRecordsWhichDepartments: [], applicant1SearchGovRecordsWhyTheseDepartments: '' }
    //   : {};

    return req.locals.api.triggerEvent(req.session.userCase.id, { ...formData }, eventName);
  }
}
