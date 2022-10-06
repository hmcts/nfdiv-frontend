import autobind from 'autobind-decorator';
import { Response } from 'express';

import { SupportedLanguages } from '../../modules/i18n';
import { getNextIncompleteStepUrl } from '../../steps';
import { CommonContent, generatePageContent } from '../../steps/common/common.content';
import { DivorceOrDissolution } from '../case/definition';

import { AppRequest } from './AppRequest';

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: CommonContent) => PageContent;

@autobind
export class GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {}

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      // If there's an async error, it wil have already rendered an error page upstream,
      // so we don't want to call render again
      return;
    }

    const language = (req.session?.lang as SupportedLanguages) || res.locals['lang'];
    const isDivorce = res.locals.serviceType === DivorceOrDissolution.DIVORCE;
    const isApplicant2 = req.session?.isApplicant2;
    const userCase = req.session?.userCase;
    const content = generatePageContent({
      language,
      pageContent: this.content,
      isDivorce,
      isApplicant2,
      userCase,
      userEmail: req.session?.user?.email,
      existingCaseId: req.session?.existingCaseId,
      inviteCaseApplicationType: req.session?.inviteCaseApplicationType,
    });

    const sessionErrors = req.session?.errors || [];

    if (req.session?.errors) {
      req.session.errors = undefined;
    }

    res.render(this.view, {
      ...content,
      sessionErrors,
      htmlLang: language,
      pageUrl: req.url,
      getNextIncompleteStepUrl: () => getNextIncompleteStepUrl(req),
    });
  }
}
