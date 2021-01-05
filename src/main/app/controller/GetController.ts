import autobind from 'autobind-decorator';
import { Response } from 'express';
import { AppRequest } from './AppRequest';
import { commonContent } from '../../steps/common/common.content';
import { DefinedError } from 'ajv';

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

    const sessionErrors = req.session.errors || [];
    const errors = sessionErrors.map(e => this.mapErrors(e, languageContent.errors, commonLanguageContent));

    req.session.errors = undefined;

    res.render(this.name, { ...languageContent, ...commonPageContent, ...commonLanguageContent, errors });
  }

  private mapErrors(error: DefinedError, contentErrors, commonLanguage) {
    let key;
    if (error.keyword === 'required') {
      key = error.params.missingProperty;
    }
    return {
      href: '#' + key,
      msg: contentErrors[key][error.keyword] || commonLanguage.invalid
    };
  }

}
