import { Request, Response } from 'express';
import autobind from 'autobind-decorator';

@autobind
export class ErrorController {

  constructor(
    private readonly logger: {
      error: (message: string) => string
    },
    private readonly exposeErrors: boolean
  ) { }

  /**
   * Catch all for 404
   */
  public notFound(req: Request, res: Response): void {
    res.status(404);
    res.render('error/not-found');
  }

  /**
   * Catch all for 500 errors
   */
  public internalServerError(err: HTTPError, req: Request, res: Response): void {
    this.logger.error(`${err.stack || err}`);

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = this.exposeErrors ? err : {};
    res.status(err.status || 500);
    res.render('error/error');
  }

  /**
   * Catch all for CSRF Token errors
   */
  public CSRFTokenError(req: Request, res: Response): void {
    res.status(403);
    res.render('error/csrf-token');
  }

}

export interface HTTPError extends Error {
  status: number
}

