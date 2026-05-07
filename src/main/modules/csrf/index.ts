import { Application, Request, Response, NextFunction } from 'express';
import type { LoggerInstance } from 'winston';
import { csrfSync } from 'csrf-sync';

import { CSRF_TOKEN_ERROR_URL } from '../../steps/urls';

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('app');

const { csrfSynchronisedProtection } = csrfSync({
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],

  getTokenFromRequest: (req) =>
    req.body?._csrf || req.headers['x-csrf-token'] as string,

  getTokenFromState: (req) => req.session.csrfToken,

  storeTokenInState: (req, token) => {
    req.session.csrfToken = token;
  },
});

export class CSRFToken {
  public enableFor(app: Application): void {
    app.use(csrfSynchronisedProtection);

    app.use((req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.csrfToken!();
        if (token) res.locals.csrfToken = token;
        next();
      } catch (err) {
        next(err);
      }
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
