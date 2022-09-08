import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields } from '../../../app/form/Form';
import { setJurisdictionFieldsAsNull } from '../../../app/jurisdiction/jurisdictionRemovalHelper';

@autobind
export default class YourDetailsPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (!req.session.userCase) {
      req.session.userCase = await req.locals.api.createCase(res.locals.serviceType, req.session.user);
    }

    const form = new Form(<FormFields>this.fields);

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...originalFormData } = form.getParsedBody(req.body);
    let formData = originalFormData;

    if ((req.session.userCase.sameSex || undefined) !== originalFormData.sameSex) {
      formData = setJurisdictionFieldsAsNull(originalFormData);
    }

    if (req.body.saveAndSignOut || req.body.saveBeforeSessionTimeout) {
      await this.saveAndSignOut(req, res, form, formData);
    } else {
      await this.saveAndContinue(req, res, form, formData);
    }
  }
}
