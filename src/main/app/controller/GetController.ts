import autobind from 'autobind-decorator';
import { Response } from 'express';
import { AppRequest } from './AppRequest';
import { commonContent } from '../../steps/common/common.content';
import { DefinedError } from 'ajv';
import { ErrorObject } from 'ajv/lib/types/index';

@autobind
export class GetController {

  constructor(
    protected readonly name: string,
    protected readonly content: Record<string, any>
  ) {}

  public async get(req: AppRequest, res: Response): Promise<void> {
    // todo set req.session.lang
    const languageContent = this.content[req.session.lang] || this.content['en'] || {};
    const commonLanguageContent = commonContent[req.session.lang] || commonContent['en'];
    const commonPageContent = this.content.common || {};

    const errors = req.session.errors || [];
    if (errors.length > 0) {
      this.mapErrors(errors, languageContent.errors);
    }

    req.session.errors = undefined;

    res.render(this.name, { ...languageContent, ...commonPageContent, ...commonLanguageContent, errors });
  }

  private mapErrors(errors: DefinedError[], contentErrors) {
    errors.forEach((error: ErrorObject) => {
      const key = error.params.missingProperty;
      error.message = contentErrors[key].required;
      error.schema = `#${key}`;
    });
  }

}
