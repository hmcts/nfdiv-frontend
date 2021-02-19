import autobind from 'autobind-decorator';
import { Response } from 'express';

import { commonContent } from '../../steps/common/common.content';
import { sequence } from '../../steps/sequence';
import { Gender } from '../api/case';

import { AppRequest } from './AppRequest';

type Translation = Record<string, unknown>;
export type Translations = { en: Translation; cy: Translation; common: Translation | undefined };
export type TranslationFn = ({ isDivorce, partner }: { isDivorce: boolean; partner: string }) => Translations;

@autobind
export class GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn | Translations) {}

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      // If there's an async error, it wil have already rendered an error page upstream,
      // so we don't want to call render again
      return;
    }

    const language = req.session?.lang || 'en';
    const commonLanguageContent = commonContent[language];
    const content = this.getContent(req, res, commonLanguageContent);
    const languageContent = content[language];
    const commonPageContent = content.common || {};
    const sessionErrors = req.session?.errors || [];

    if (req.session?.errors) {
      req.session.errors = undefined;
    }

    res.render(this.view, {
      ...languageContent,
      ...commonPageContent,
      ...commonLanguageContent,
      sessionErrors,
      formState: req.session?.userCase,
      hideBackButton: req.originalUrl === sequence[0].url,
    });
  }

  private getContent(req: AppRequest, res: Response, translations: Translations): Translations {
    if (typeof this.content !== 'function') {
      return this.content;
    }

    const isDivorce = res.locals.serviceType !== 'civil';

    return this.content({ isDivorce, partner: this.getPartnerContent(req, isDivorce, translations) });
  }

  private getPartnerContent(req: AppRequest, isDivorce: boolean, translations: Translations): string {
    if (!isDivorce) {
      return translations['civilPartner'];
    }

    const selectedPartnerGender = req.session.userCase?.partnerGender;
    if (selectedPartnerGender === Gender.Male) {
      return translations['husband'];
    }
    if (selectedPartnerGender === Gender.Female) {
      return translations['wife'];
    }

    return translations['partner'];
  }
}
