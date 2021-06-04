import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import { Case } from '../case/case';
import { ApplicationType, CITIZEN_INVITE_APPLICANT_2 } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form } from '../form/Form';

@autobind
export class InviteApplicant2PostController extends PostController<AnyObject> {
  constructor(protected readonly form: Form) {
    super(form);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = this.form.getParsedBody(req.body);

    if (formData.applicationType === ApplicationType.JOINT_APPLICATION) {
      await this.sendToApplicant2ForReview(req, res, formData);
    } else {
      await super.post(req, res);
    }
  }

  public async sendToApplicant2ForReview(
    req: AppRequest<AnyObject>,
    res: Response,
    formData: Partial<Case>
  ): Promise<void> {
    Object.assign(req.session.userCase, formData);
    this.form.setFormState(req.session.userCase);
    req.session.errors = this.form.getErrors(formData);

    try {
      req.session.userCase = await this.save(req, formData, CITIZEN_INVITE_APPLICANT_2);
    } catch (err) {
      // do nothing
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
