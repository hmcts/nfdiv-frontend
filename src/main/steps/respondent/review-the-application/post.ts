import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case } from '../../../app/case/case';
import { DRAFT_AOS, UPDATE_AOS, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { getNextStepUrl } from '../../index';

@autobind
export default class ReviewTheApplicationPostController extends PostController<AnyObject> {
  protected async saveAndContinue(
    req: AppRequest<AnyObject>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length === 0) {
      try {
        if (req.session.userCase.aosIsDrafted === YesOrNo.YES) {
          req.session.userCase = await this.save(req, formData, UPDATE_AOS);
        } else {
          req.session.userCase = await this.save(req, formData, DRAFT_AOS);
        }
      } catch (err) {
        req.locals.logger.error('Error saving', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }

    const nextUrl = req.session.errors.length > 0 ? req.url : getNextStepUrl(req, req.session.userCase);

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
