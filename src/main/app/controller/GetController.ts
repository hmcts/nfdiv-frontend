import autobind from 'autobind-decorator';
import { Response } from 'express';
import { AppRequest } from './AppRequest';

@autobind
export class GetController {

  constructor(
    protected readonly name: string,
    protected readonly content: Record<string, any>
  ) {}

  public async get(req: AppRequest, res: Response): Promise<void> {
    // todo set req.session.lang
    const languageContent = this.content[req.session.lang] || this.content['en'] || {};
    const commonContent = this.content.common || {};
    const errors = req.session.errors || [];

    res.render(this.name, { ...languageContent, ...commonContent, errors });
  }

}
