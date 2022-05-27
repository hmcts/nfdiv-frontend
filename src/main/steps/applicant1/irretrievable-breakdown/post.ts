import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields } from '../../../app/form/Form';

@autobind
export default class IrretrievableBreakdownPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);

    const { saveAndSignOut, ...originalFormData } = form.getParsedBody(req.body);
    const formData = originalFormData;

    formData.divorceOrDissolution = req.session.userCase.divorceOrDissolution;

    if (req.body.saveAndSignOut || req.body.saveBeforeSessionTimeout) {
      await this.saveAndSignOut(req, res, formData);
    } else {
      await this.saveAndContinue(req, res, form, formData);
    }
  }
}
