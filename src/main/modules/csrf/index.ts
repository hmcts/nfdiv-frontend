import crypto from 'crypto';

import { NextFunction, Request, RequestHandler, Response } from 'express';
import { LoggerInstance } from 'winston';

import { CSRF_TOKEN_ERROR_URL } from '../../steps/urls';

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('app');

// Extend Express Request to include csrfToken
declare module 'express-session' {
  interface SessionData {
    csrfToken?: string;
  }
}

declare module 'express' {
  interface Request {
    csrfToken?: () => string;
  }
}

export class CSRFToken {
  public enableFor(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.session) {
        return next(new Error('Session middleware is required before CSRF protection'));
      }

      // Store CSRF token in session to persist across requests
      if (!req.session.csrfToken) {
        req.session.csrfToken = crypto.randomBytes(32).toString('hex');
      }

      // Expose the CSRF token as a function (to match expected type)
      req.csrfToken = () => req.session.csrfToken as string;

      // Attach CSRF token to response locals and headers
      res.locals.csrfToken = req.csrfToken();
      res.setHeader('x-csrf-token', req.csrfToken());

      // Validate CSRF token for state-changing requests
      if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
        const csrfHeader = req.headers['x-csrf-token'];
        const csrfBody = req.body?._csrf;
        const csrfSessionToken = req.session.csrfToken; // ✅ Use session value

        if (!csrfSessionToken || (csrfHeader !== csrfSessionToken && csrfBody !== csrfSessionToken)) {
          logger.debug(`CSRF validation failed for ${req.method} ${req.originalUrl}`);
          return res.redirect(CSRF_TOKEN_ERROR_URL);
        }
      }

      next();
    };
  }
}
