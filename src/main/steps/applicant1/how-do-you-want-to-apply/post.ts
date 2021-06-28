import autobind from 'autobind-decorator';
import { NextFunction, Response } from 'express';

import { ApplicationType, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';

@autobind
export default class HowDoYouWantToApplyPostController extends PostController<AnyObject> {
  constructor(protected readonly form: Form) {
    super(form);
  }

  public async post(req: AppRequest<AnyObject>, res: Response, next?: NextFunction): Promise<void> {
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = this.form.getParsedBody(req.body);

    if (
      formData.applicationType === ApplicationType.SOLE_APPLICATION &&
      req.session.userCase.applicant2AddressPrivate === YesOrNo.YES
    ) {
      req.body.applicant2Address1 = null;
      req.body.applicant2Address2 = null;
      req.body.applicant2Address3 = null;
      req.body.applicant2AddressTown = null;
      req.body.applicant2AddressCounty = null;
      req.body.applicant2AddressPostcode = null;
      req.body.applicant2AddressCountry = null;
    }

    await super.post(req, res, next);
  }
}
