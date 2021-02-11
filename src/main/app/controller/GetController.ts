import autobind from 'autobind-decorator';
import { Response } from 'express';

import { commonContent } from '../../steps/common/common.content';

import { AppRequest } from './AppRequest';

export type Translations = Record<'en' | 'cy' | 'common', Record<string, unknown>>;
export type TranslationFn = (isDivorce: boolean) => Translations;

@autobind
export class GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn | Translations,
    protected readonly stepId: string | undefined = undefined
  ) {}

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      // If there's an async error, it wil have already rendered an error page upstream,
      // so we don't want to call render again
      return;
    }

    const isDivorce = res.locals.serviceType !== 'civil';
    const derivedContent = typeof this.content === 'function' ? this.content(isDivorce) : this.content;

    const language = req.session.lang || 'en';
    const languageContent = derivedContent[language];
    const commonLanguageContent = commonContent[language];
    const commonPageContent = derivedContent.common || {};

    const sessionErrors = req.session.errors || [];

    req.session.errors = undefined;

    res.render(this.view, {
      ...languageContent,
      ...commonPageContent,
      ...commonLanguageContent,
      sessionErrors,
      ...(this.stepId && { formState: req.session.state[this.stepId] }),
    });
  }
}
