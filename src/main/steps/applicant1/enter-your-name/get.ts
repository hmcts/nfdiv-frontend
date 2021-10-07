import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class EnterYourNameGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase.applicant1FirstNames = req.session.userCase.applicant1FirstNames || req.session.user.givenName;
    req.session.userCase.applicant1LastNames = req.session.userCase.applicant1LastNames || req.session.user.familyName;

    return super.get(req, res);
  }
}
