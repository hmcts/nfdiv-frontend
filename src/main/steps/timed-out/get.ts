import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';
import { commonContent } from '../common/common.content';

import { timedOutContent } from './content';

@autobind
export class TimedOutGetController extends GetController {
  constructor() {
    super(__dirname + '/template', timedOutContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    req.session.destroy(err => {
      if (err) {
        throw err;
      }

      const language = req.session?.lang || 'en';
      const commonLanguageContent = commonContent[language];
      const languageContent = timedOutContent[language];
      const commonPageContent = timedOutContent.common || {};

      res.render(this.view, {
        ...commonLanguageContent,
        ...languageContent,
        ...commonPageContent,
      });
    });
  }
}
