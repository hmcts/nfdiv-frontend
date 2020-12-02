import { GetController } from '../../app/controller/GetController';
import { AppRequest } from '../../app/controller/AppRequest';
import { Response } from 'express';
import { firstPageContent } from './first-page.content';
import autobind from 'autobind-decorator';
import { Steps } from '../steps';

@autobind
export class FirstPageGet extends GetController {

  constructor() {
    super(__dirname + Steps.FIRST_PAGE, firstPageContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    res.locals.someApiResponse = { data: 'some data' };

    return super.get(req, res);
  }

}
