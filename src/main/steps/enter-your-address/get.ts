import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

@autobind
export default class YourAddressGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (Object.keys(req.query).includes('postcode')) {
      req.session.userCase.applicant1AddressPostcode = req.query.postcode?.toString();
    }
    super.get(req, res);
  }
}
