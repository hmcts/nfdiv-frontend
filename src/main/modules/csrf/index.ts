import csurf from 'csurf';
import type { Application } from 'express';
import type { Logger } from 'winston';

import { CSRF_TOKEN_ERROR_URL } from '../../steps/urls';

export class CSRFToken {
  public enableFor(app: Application, logger: Logger): void {
    app.use(csurf(), (req, res, next) => {
      res.locals.csrfToken = req.csrfToken();
      next();
    });

    app.use((error, req, res, next) => {
      if (error.code === 'EBADCSRFTOKEN') {
        logger.error(`${error.stack || error}`);
        return res.redirect(CSRF_TOKEN_ERROR_URL);
      }
      next();
    });
  }
}
