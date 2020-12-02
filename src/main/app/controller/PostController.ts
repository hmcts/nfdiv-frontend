import { Response } from 'express';
import { Form } from '../form/Form';
import { AppRequest } from './AppRequest';

export abstract class PostController {

  constructor(
    private form: Form
  ) { }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const errors = this.form.getErrors(req.body);

    if (errors.length > 0) {
      req.session.errors = errors;
      res.redirect(req.url);
    } else {
      req.session.errors = undefined;
      // todo session handling
      // req.session.state[this.form.getName()] = req.body;

      res.redirect(this.getNextStep(req.body));
    }
  }

  protected abstract getNextStep(body: {}): string;

}
