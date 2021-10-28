import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import { getAddressesFromPostcode } from '../../../app/postcode/postcode-lookup';

@autobind
export class PostcodeLookupPostController {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const postcode = req.body.postcode as string;

    res.json(await getAddressesFromPostcode(postcode, req.locals.logger));
  }
}
