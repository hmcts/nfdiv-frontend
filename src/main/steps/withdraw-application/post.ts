import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CITIZEN_WITHDRAW } from '../../app/case/definition';
import { APPLICATION_WITHDRAWN } from '../urls';
import { AppRequest } from '../..//app/controller/AppRequest';
import { AnyObject, PostController } from '../../app/controller/PostController';

@autobind
export class WithdrawApplicationPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      await super.save(req, {}, CITIZEN_WITHDRAW);
    } catch {
    // ignore
    }

    res.redirect(APPLICATION_WITHDRAWN);
  }
  

  protected getEventName(): string {
    return CITIZEN_WITHDRAW;
  }
}
