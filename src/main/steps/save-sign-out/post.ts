import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../app/controller/PostController';
import { Form } from '../../app/form/Form';
import { Language, generatePageContent } from '../../steps/common/common.content';
import { generateContent } from '../../steps/save-sign-out/content';

@autobind
export class SaveSignOutPostController<T extends AnyObject> extends PostController<T> {
  constructor(protected readonly form: Form) {
    super(form);
  }

  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    super.post(req, res);

    const email = req.session.user?.email;
    const language = (req.session?.lang || 'en') as Language;

    req.session.destroy(err => {
      if (err) {
        throw err;
      }

      const commonContent = generatePageContent(language, generateContent);

      res.render(`${__dirname}/../../steps/save-sign-out/template.njk`, {
        ...commonContent,
        email,
      });
    });
  }
}
