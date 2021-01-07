import { Application } from 'express';
import csurf from 'csurf';
import { CSRF_TOKEN_ERROR_URL } from '../../steps/urls';
const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('app');

export class CSRFToken {
  public enableFor(app: Application): void {
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
