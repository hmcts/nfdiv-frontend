import { Response } from 'express';

import { AnyObject } from '../../app/controller/PostController';
import { RequestWithScope } from '../../modules/oidc';
import { getNextIncompleteStepUrl } from '../../steps';

export class HomeGetController {
  public async get(req: RequestWithScope<AnyObject>, res: Response): Promise<void> {
    if (req.session.userCase?.divorceOrDissolution !== res.locals.serviceType) {
      // Clear current application if the user changes between the divorce and civil dissolution services
      Object.assign(req.session.userCase, {
        ...Object.keys(req.session.userCase)
          .map(prop => ({ [prop]: '' }))
          .reduce((previous, current) => ({ ...previous, ...current }), {}),
        id: req.session.userCase.id,
        divorceOrDissolution: res.locals.serviceType,
      });

      await req.scope?.cradle.api.updateCase(req.session.userCase.id, req.session.userCase);
      await new Promise<void>((resolve, reject): void => {
        req.session.save(err => (err ? reject(err) : resolve()));
      });
    }

    res.redirect(getNextIncompleteStepUrl(req));
  }
}
