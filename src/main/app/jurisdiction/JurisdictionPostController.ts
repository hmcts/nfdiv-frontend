import { Response } from 'express';

import autobind from '../../app/utils/autobind.js';
import { JURISDICTION_INTERSTITIAL_URL } from '../../steps/urls.js';
import { Case, CaseWithId } from '../case/case.js';
import { AppRequest } from '../controller/AppRequest.js';
import { AnyObject, PostController } from '../controller/PostController.js';
import { FormFields, FormFieldsFn } from '../form/Form.js';

import { addConnectionsBasedOnQuestions } from './connections.js';
import { setUnreachableJurisdictionFieldsAsNull } from './jurisdictionRemovalHelper.js';

@autobind
export class JurisdictionPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = this.getForm(req);

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    if (req.url.includes(JURISDICTION_INTERSTITIAL_URL) && formData.connections) {
      req.body.connections = addConnectionsBasedOnQuestions({ ...req.session.userCase, ...formData }).concat(
        formData.connections
      );
    } else {
      req.body.connections = addConnectionsBasedOnQuestions({ ...req.session.userCase, ...formData });
    }

    await super.post(req, res);
  }

  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    const unreachableAnswersAsNull = setUnreachableJurisdictionFieldsAsNull(req.session.userCase);
    const dataToSave = {
      ...unreachableAnswersAsNull,
      ...formData,
    };

    return req.locals.api.triggerEvent(req.session.userCase.id, dataToSave, eventName);
  }
}
