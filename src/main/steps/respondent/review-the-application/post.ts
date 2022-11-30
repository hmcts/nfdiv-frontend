import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case, Checkbox } from '../../../app/case/case';
import { CITIZEN_APPLICANT2_UPDATE, CITIZEN_SAVE_AND_CLOSE, DRAFT_AOS } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { SAVE_AND_SIGN_OUT } from '../../urls';

@autobind
export default class ReviewTheApplicationPostController extends PostController<AnyObject> {
  protected async saveAndContinue(
    req: AppRequest<AnyObject>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    const preSubmissionSession = JSON.parse(JSON.stringify(req.session.userCase));
    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length === 0) {
      try {
        if (preSubmissionSession.confirmReadPetition !== Checkbox.Checked) {
          req.session.userCase = await this.save(req, formData, DRAFT_AOS);
        } else {
          req.session.userCase = await this.save(req, formData, CITIZEN_APPLICANT2_UPDATE);
        }
      } catch (err) {
        req.locals.logger.error('Error saving', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }

    this.saveSessionAndRedirect(req, res);
  }

  protected async saveAndSignOut(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      await this.save(req, {}, CITIZEN_SAVE_AND_CLOSE);
    } catch {
      // ignore
    }
    res.redirect(SAVE_AND_SIGN_OUT);
  }
}
