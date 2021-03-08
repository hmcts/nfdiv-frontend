import { DivorceOrDissolution, Gender } from '@hmcts/nfdiv-case-definition';
import autobind from 'autobind-decorator';
import { Response } from 'express';
import Negotiator from 'negotiator';

import { LanguageToggle } from '../../modules/i18n';
import { getNextIncompleteStepUrl } from '../../steps';
import { commonContent } from '../../steps/common/common.content';
import { Case } from '../case/case';

import { AppRequest } from './AppRequest';

type Translation = Record<string, unknown>;
export type Translations = { en: Translation; cy: Translation; common: Translation | undefined };
export type TranslationFn = ({
  isDivorce,
  partner,
  formState,
}: {
  isDivorce: boolean;
  partner: string;
  formState: Partial<Case>;
}) => Translations;

@autobind
export class GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn | Translations,
    protected language = 'en'
  ) {}

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      // If there's an async error, it wil have already rendered an error page upstream,
      // so we don't want to call render again
      return;
    }

    const language = this.getPreferredLanguage(req);
    const commonLanguageContent = commonContent[language];

    const isDivorce = res.locals.serviceType === DivorceOrDissolution.DIVORCE;
    const formState = req.session?.userCase;
    const selectedGender = formState?.gender as Gender;
    const partner = this.getPartnerContent(selectedGender, isDivorce, commonLanguageContent);
    const content = this.getContent(isDivorce, partner, formState);

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
      htmlLang: language,
      language,
      isDivorce,
      partner,
      formState,
      getNextIncompleteStepUrl: () => getNextIncompleteStepUrl(req),
    });
  }

  private getContent(isDivorce: boolean, partner: string, formState: Partial<Case>): Translations {
    if (typeof this.content !== 'function') {
      return this.content;
    }

    return this.content({
      isDivorce,
      partner,
      formState,
    });
  }

  private getPartnerContent(selectedGender: Gender, isDivorce: boolean, translations: Translations): string {
    if (!isDivorce) {
      return translations['civilPartner'];
    }

    if (selectedGender === Gender.MALE) {
      return translations['husband'];
    }
    if (selectedGender === Gender.FEMALE) {
      return translations['wife'];
    }

    return translations['partner'];
  }

  private getPreferredLanguage(req: AppRequest) {
    // User selected language
    const requestedLanguage = req.query['lng'] as string;
    if (LanguageToggle.supportedLanguages.includes(requestedLanguage)) {
      return requestedLanguage;
    }

    // Saved session language
    if (req.session?.lang) {
      return req.session.lang;
    }

    // Browsers default language
    const negotiator = new Negotiator(req);
    return negotiator.language(LanguageToggle.supportedLanguages) || 'en';
  }
}
