import autobind from 'autobind-decorator';
import { Response } from 'express';

import { State, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class EnterTheirAddressGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (
      req.session.userCase.applicant2AddressPrivate === YesOrNo.YES &&
      req.session.userCase.state === State.AwaitingApplicant1Response
    ) {
      req.session.userCase.applicant2Address1 = undefined;
      req.session.userCase.applicant2Address2 = undefined;
      req.session.userCase.applicant2Address3 = undefined;
      req.session.userCase.applicant2AddressCountry = undefined;
      req.session.userCase.applicant2AddressCounty = undefined;
      req.session.userCase.applicant2AddressPostcode = undefined;
      req.session.userCase.applicant2AddressTown = undefined;
      req.session.userCase.applicant2AddressPrivate = YesOrNo.NO;
    }

    return super.get(req, res);
  }
}
