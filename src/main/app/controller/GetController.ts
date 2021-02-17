import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getSteps } from '../../steps';
import { commonContent } from '../../steps/common/common.content';

import { AppRequest } from './AppRequest';

type Translation = Record<string, unknown>;
export type Translations = { en: Translation; cy: Translation; common: Translation | undefined };
export type TranslationFn = ({ isDivorce, partner }: { isDivorce: boolean; partner: string }) => Translations;

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

    const language = req.session.lang || 'en';
    const commonLanguageContent = commonContent[language];
    const content = this.getContent(req, res, commonLanguageContent);
    const languageContent = content[language];
    const commonPageContent = content.common || {};

    const sessionErrors = req.session.errors || [];
    req.session.errors = undefined;

    const shouldHideBackButton = this.stepId && getSteps().findIndex(step => step.url === req.originalUrl) === 0;

    res.render(this.view, {
      ...languageContent,
      ...commonPageContent,
      ...commonLanguageContent,
      sessionErrors,
      ...(this.stepId && { formState: req.session.state[this.stepId] }),
      ...(shouldHideBackButton && { hideBackButton: true }),
    });
  }

  private getContent(req: AppRequest, res: Response, translations: Translations): Translations {
    if (typeof this.content !== 'function') {
      return this.content;
    }

    const isDivorce = res.locals.serviceType !== 'civil';

    const getPartner = (): string => {
      if (!isDivorce) {
        return translations['civilPartner'];
      }

      const selectedPartnerGender = req.session.state['your-details']?.partnerGender;
      if (selectedPartnerGender === 'Masculine') {
        return translations['husband'];
      }
      if (selectedPartnerGender === 'Feminine') {
        return translations['wife'];
      }

      return translations['partner'];
    };

    return this.content({ isDivorce, partner: getPartner() });
  }
}
