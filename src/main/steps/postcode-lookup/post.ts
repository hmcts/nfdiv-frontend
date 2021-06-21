import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject } from '../../app/controller/PostController';
import { getAddressesFromPostcode } from '../../app/postcode/postcode-lookup';

export class PostcodeLookupPostController {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    res.json(await getAddressesFromPostcode(req.body.postcode as string, req.locals.logger));
  }
}
