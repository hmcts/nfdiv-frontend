import autobind from 'autobind-decorator';
import { Response } from 'express';

import { commonContent } from '../../steps/common/common.content';
import { sequence } from '../../steps/sequence';
import { Case, CaseType, Gender } from '../case/case';

import { AppRequest } from './AppRequest';

type Translation = Record<string, unknown>;
export type Translations = { en: Translation; cy: Translation; common: Translation | undefined };
export type TranslationFn = ({
  isDivorce,
  partner,
}: {
  isDivorce: boolean;
  partner: string;
  formState: Partial<Case>;
}) => Translations;

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
      ...commonLanguageContent,
      ...languageContent,
      ...commonPageContent,
      sessionErrors,
      formState: req.session?.userCase,
      hideBackButton: req.path === sequence[0].url,
    });
  }

  private getContent(req: AppRequest, res: Response, translations: Translations): Translations {
    if (typeof this.content !== 'function') {
      return this.content;
    }

    const isDivorce = res.locals.serviceType === CaseType.Divorce;

    return this.content({
      isDivorce,
      partner: this.getPartnerContent(req, isDivorce, translations),
      formState: req.session?.userCase,
    });
  }

  private getPartnerContent(req: AppRequest, isDivorce: boolean, translations: Translations): string {
    if (!isDivorce) {
      return translations['civilPartner'];
    }

    const selectedGender = req.session.userCase?.gender;
    if (selectedGender === Gender.Male) {
      return translations['husband'];
    }
    if (selectedGender === Gender.Female) {
      return translations['wife'];
    }

    return translations['partner'];
  }
}
