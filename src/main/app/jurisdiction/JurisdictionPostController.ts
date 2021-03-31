import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form } from '../form/Form';

import { addConnection } from './connections';

@autobind
export class JurisdictionPostController extends PostController<AnyObject> {
  constructor(protected readonly form: Form) {
    super(form);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = this.form.getParsedBody(req.body);
    req.body.connections = addConnection({ ...req.session.userCase, ...formData });
    await super.post(req, res);
  }
}
