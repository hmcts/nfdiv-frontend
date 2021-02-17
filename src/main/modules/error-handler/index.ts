import { Application, NextFunction, Request, Response } from 'express';
import { LoggerInstance } from 'winston';

import { AppRequest } from '../../app/controller/AppRequest';

const setupErrorHandler = renderError => render => async (...args): Promise<void> => {
  try {
    await render(...args);
  } catch (err) {
    const [req, res] = args as [AppRequest, Response];
    renderError(err, req, res);
  }
};

export class ErrorHandler {
  public enableFor(app: Application, logger: LoggerInstance): void {
    process.on('unhandledRejection', (reason, p) => {
      logger.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    });

    const errorHandler = setupErrorHandler(app.locals.container.cradle.errorController.internalServerError);
    app.locals.errorHandler = render => errorHandler(render);
  }

  public handleNextErrorsFor(app: Application): void {
    app.use((err: Error | string | undefined, req: Request, res: Response, next: NextFunction) => {
      if (err) {
        return app.locals.container.cradle.errorController.internalServerError(err, req, res);
      }
      next();
    });
  }
}
