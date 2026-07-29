import { Response } from 'express';

import { ApplicationType, State } from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject, PostController } from '../../../app/controller/PostController.js';
import { Form, FormFields } from '../../../app/form/Form.js';
import { setJurisdictionFieldsAsNull } from '../../../app/jurisdiction/jurisdictionRemovalHelper.js';
import autobind from '../../../app/utils/autobind.js';
import { SWITCH_TO_SOLE_APPLICATION } from '../../urls.js';

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
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...originalFormData } = form.getParsedBody(req.body);
    let formData = originalFormData;

    if (req.session.userCase.applicationType !== originalFormData.applicationType) {
      formData = setJurisdictionFieldsAsNull(originalFormData);
    }

    if (req.body.saveAndSignOut || req.body.saveBeforeSessionTimeout) {
      await this.saveAndSignOut(req, res, form, formData);
    } else {
      await this.saveAndContinue(req, res, form, formData);
    }
  }
}
