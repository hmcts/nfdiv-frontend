import autobind from 'autobind-decorator';
import { Response } from 'express';

import { commonContent } from '../../steps/common/common.content';

import { AppRequest } from './AppRequest';

@autobind
export class GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: Record<'en' | 'cy' | 'common', Record<'divorce' | 'civil' | string, unknown>>
  ) {}

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError) {
      // If there's an async error, it wil have already rendered an error page upstream,
      // so we don't want to call render again
      return;
    }
    const language = req.session?.lang || 'en';
    const serviceType = res.locals?.serviceType || 'divorce';

    const languageContent = this.content[language]?.[serviceType] || {};
    const commonLanguageContent = commonContent[language];
    const commonPageContent = this.content.common || {};

    const sessionErrors = req.session.errors || [];

    req.session.errors = undefined;

    res.render(this.view, { ...languageContent, ...commonPageContent, ...commonLanguageContent, sessionErrors });
  }
}
