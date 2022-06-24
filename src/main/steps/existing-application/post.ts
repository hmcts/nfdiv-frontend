import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../app/controller/PostController';
import { CaseWithFormData, Form, FormFields } from '../../app/form/Form';
import { ENTER_YOUR_ACCESS_CODE, HOME_URL, SAVE_AND_SIGN_OUT } from '../urls';

@autobind
export class ExistingApplicationPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(this.fields as FormFields);

    const { saveAndSignOut, saveBeforeSessionTimeout, ...formData } = form.getParsedBody(req.body);

    if (saveAndSignOut || saveBeforeSessionTimeout) {
      res.redirect(SAVE_AND_SIGN_OUT);
    } else {
      await this.saveAndContinue(req, res, form, formData);
    }
  }

  protected async saveAndContinue(
    req: AppRequest,
    res: Response,
    form: Form,
    formData: Partial<CaseWithFormData>
  ): Promise<void> {
    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length === 0) {
      try {
        if (formData.existingOrNew === 'existing') {
          req.session.userCase = await req.locals.api.triggerEvent(req.session.inviteCase.id, {}, 'cancel-case-invite');
        }
      } catch (err) {
        req.locals.logger.error('Error saving', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }

    const nextUrl =
      req.session.errors.length > 0
        ? req.url
        : formData.existingOrNew === 'existing'
        ? HOME_URL
        : ENTER_YOUR_ACCESS_CODE;

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
