import { GetController } from '../../app/controller/GetController';
import { AppRequest } from '../../app/controller/AppRequest';
import { Response } from 'express';
import { firstPageContent } from './first-page.content';
import autobind from 'autobind-decorator';
import { FIRST_PAGE_URL } from '../urls';

@autobind
export class FirstPageGet extends GetController {

  constructor() {
    super(__dirname + FIRST_PAGE_URL, firstPageContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    res.locals.someApiResponse = { data: 'some data' };

    req.session.state.initialise('livingArrangementsLiveTogether', (value: string, state: any) => {
      if (value !== 'Yes') {
        state.remove('lp');
      }
    });

    return super.get(req, res);
  }

}
