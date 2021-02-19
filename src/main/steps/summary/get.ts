import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController, Translations } from '../../app/controller/GetController';
import { RequestWithScope } from '../../modules/oidc';
import { HOME_URL } from '../../steps/urls';

import { summaryContent } from './content';

@autobind
export class SummaryGetController extends GetController {
  constructor(protected readonly content: Translations = { ...summaryContent }) {
    super(__dirname + '/template', content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    super.get(req, res);
  }

  public async reset(req: RequestWithScope, res: Response): Promise<void> {
    const resetCase = { id: req.session.userCase?.id };
    for (const [key] of Object.entries(req.session.userCase)) {
      if (key !== 'id') {
        resetCase[key] = '';
      }
    }

    await req.scope?.cradle.api.updateCase(req.session.userCase?.id, resetCase);
    req.session.userCase = await req.scope?.cradle.api.getCase();

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(HOME_URL);
    });
  }
}
