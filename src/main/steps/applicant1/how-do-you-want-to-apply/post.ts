import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case, CaseWithId } from '../../../app/case/case';
import { ApplicationType, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields } from '../../../app/form/Form';
import {
  isFormDataDifferentToSessionData,
  setJurisdictionFieldsToNull,
} from '../../../app/jurisdiction/jurisdictionRemovalHelper';
import { SWITCH_TO_SOLE_APPLICATION } from '../../urls';

@autobind
export default class ApplicationTypePostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (
      req.session.userCase.state === State.AwaitingApplicant1Response &&
      req.body.applicationType === ApplicationType.SOLE_APPLICATION
    ) {
      return res.redirect(SWITCH_TO_SOLE_APPLICATION);
    }

    const form = new Form(<FormFields>this.fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    if (isFormDataDifferentToSessionData(formData, req.session.userCase, 'applicationType')) {
      req.body['removeJurisdictionFields'] = 'true';
    }

    await super.post(req, res);
  }

  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.body.removeJurisdictionFields) {
      formData = setJurisdictionFieldsToNull(formData);
    }

    return req.locals.api.triggerEvent(req.session.userCase.id, formData, eventName);
  }
}
