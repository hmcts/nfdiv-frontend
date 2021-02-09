import autobind from 'autobind-decorator';
import { Response } from 'express';

import { commonContent } from '../../steps/common/common.content';

import { AppRequest } from './AppRequest';

type DivorceOrCivilContext = Record<string, unknown>;
type TranslationContent = (isDivorce: boolean) => Record<'en' | 'cy' | 'common', DivorceOrCivilContext>;

@autobind
export class GetController {
  constructor(protected readonly view: string, protected readonly getContent: TranslationContent) {}

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      // If there's an async error, it wil have already rendered an error page upstream,
      // so we don't want to call render again
      return;
    }

    const isDivorce = res.locals?.serviceType !== 'civil';
    const content = this.getContent(isDivorce);

    const language = req.session?.lang || 'en';
    const languageContent = content?.[language];
    const commonLanguageContent = commonContent[language];
    const commonPageContent = content?.common || {};

    const sessionErrors = req.session.errors || [];

    req.session.errors = undefined;

    res.render(this.view, { ...languageContent, ...commonPageContent, ...commonLanguageContent, sessionErrors });
  }
}
