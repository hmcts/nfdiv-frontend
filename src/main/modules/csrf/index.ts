import csurf from 'csurf';
import type { Application, RequestHandler } from 'express';
import type { LoggerInstance } from 'winston';

import { CSRF_TOKEN_ERROR_URL } from '../../steps/urls';

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('app');

export class CSRFToken {
  public enableFor(app: Application): void {
    app.use(csurf() as unknown as RequestHandler, (req, res, next) => {
      res.locals.csrfToken = req.csrfToken();
      next();
    });

    app.use((error, req, res, next) => {
      if (error.code === 'EBADCSRFTOKEN') {
        logger.debug(`${error.stack || error}`);
        return res.redirect(CSRF_TOKEN_ERROR_URL);
      }
      next();
    });
  }
}
