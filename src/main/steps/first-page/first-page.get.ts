import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';
import { FIRST_PAGE_URL } from '../urls';

import { firstPageContent } from './first-page.content';

@autobind
export class FirstPageGet extends GetController {
  constructor() {
    super(__dirname + FIRST_PAGE_URL, firstPageContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    res.locals.someApiResponse = { data: 'some data' };

    return super.get(req, res);
  }
}
