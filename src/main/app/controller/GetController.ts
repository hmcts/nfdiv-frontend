import { DivorceOrDissolution } from '@hmcts/nfdiv-case-definition';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextIncompleteStepUrl } from '../../steps';
import { generatePageContent } from '../../steps/common/common.content';

import { AppRequest } from './AppRequest';

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: Record<string, unknown>) => PageContent;

@autobind
export class GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {}

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      // If there's an async error, it wil have already rendered an error page upstream,
      // so we don't want to call render again
      return;
    }

    const language = req.session?.lang || 'en';

    const isDivorce = res.locals.serviceType === DivorceOrDissolution.DIVORCE;
    const formState = req.session?.userCase;
    const content = generatePageContent(language, this.content, isDivorce, formState);

    const sessionErrors = req.session?.errors || [];

    if (req.session?.errors) {
      req.session.errors = undefined;
    }

    res.render(this.view, {
      ...content,
      sessionErrors,
      formState,
      getNextIncompleteStepUrl: () => getNextIncompleteStepUrl(req),
    });
  }
}
