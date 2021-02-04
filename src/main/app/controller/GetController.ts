import autobind from 'autobind-decorator';
import { Response } from 'express';

import { commonContent, contentType } from '../../steps/common/common.content';

import { AppRequest } from './AppRequest';

@autobind
export class GetController {
  constructor(protected readonly name: string, protected readonly content: contentType) {}

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError) {
      // If there's an async error, it wil have already rendered an error page upstream,
      // so we don't want to call render again
      return;
    }

    const languageContent =
      this.content[res.locals.serviceType][req.session.lang] || this.content[res.locals.serviceType]['en'] || {};
    const commonLanguageContent = commonContent[req.session.lang] || commonContent['en'];
    const commonPageContent = this.content.common || {};

    const sessionErrors = req.session.errors || [];

    req.session.errors = undefined;

    res.render(this.name, { ...languageContent, ...commonPageContent, ...commonLanguageContent, sessionErrors });
  }
}
