import { Application } from 'express';

import { HTTPError } from '../../steps/error/error.controller';

const MAX_TIME_LIMIT = 30 * 1000;

export class LoadTimeouts {
  public enableFor(app: Application): void {
    app.use((req, res, next) => {
      const { errorController } = app.locals.container.cradle;

      // Set the timeout for all HTTP requests
      req.setTimeout(MAX_TIME_LIMIT, () => {
        const err = new HTTPError('Request Timeout', 408);
        errorController.internalServerError(err, req, res);
      });

      // Set the server response timeout for all HTTP requests
      res.setTimeout(MAX_TIME_LIMIT, () => {
        const err = new HTTPError('Service Unavailable', 503);
        errorController.internalServerError(err, req, res);
      });

      next();
    });
  }
}
