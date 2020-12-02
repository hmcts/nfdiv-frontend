import { GetController } from '../../app/controller/GetController';
import { AppRequest } from '../../app/controller/AppRequest';
import { Response } from 'express';
import { firstPageContent } from './first-page.content';
import autobind from 'autobind-decorator';

@autobind
export class FirstPageGet extends GetController {
  public static readonly URL = '/first-page';

  constructor() {
    super(__dirname + FirstPageGet.URL, firstPageContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    res.locals.someApiResponse = { data: 'some data' };

    return super.get(req, res);
  }

}
