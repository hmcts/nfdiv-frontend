import autobind from 'autobind-decorator';
import { Response } from 'express';

import { commonContent } from '../../steps/common/common.content';

import { AppRequest } from './AppRequest';

export type Translations = Record<'en' | 'cy' | 'common', Record<string, unknown>>;
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

    res.render(this.view, {
      ...languageContent,
      ...commonPageContent,
      ...commonLanguageContent,
      sessionErrors,
      ...(this.stepId && { formState: req.session.state?.[this.stepId] }),
    });
  }

  private getContent(req: AppRequest, res: Response, translations: Translations): Translations {
    if (typeof this.content !== 'function') {
      return this.content;
    }

    const isDivorce = res.locals.serviceType !== 'civil';
    const yourDetails = req.session.state?.['your-details'] as Record<string, string> | undefined;
    const selectedPartnerGender = yourDetails?.partnerGender;
    let partner = '';
    if (selectedPartnerGender) {
      if (!isDivorce) {
        partner = translations['civilPartner'];
      } else {
        partner = selectedPartnerGender === 'Masculine' ? translations['husband'] : translations['wife'];
      }
    }

    return this.content({ isDivorce, partner });
  }
}
