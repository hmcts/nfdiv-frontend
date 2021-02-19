import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController, Translations } from '../../app/controller/GetController';

import { summaryContent } from './content';

@autobind
export class SummaryGetController extends GetController {
  constructor(protected readonly content: Translations = { ...summaryContent }) {
    super(__dirname + '/template', content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    super.get(req, res);
  }
}
