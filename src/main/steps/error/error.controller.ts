import { Request, Response } from 'express';
import autobind from 'autobind-decorator';
import { commonContent } from '../common/common.content';

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
    this.render('error/not-found', req, res);
  }

  /**
   * Catch all for 500 errors
   */
  public internalServerError(err: HTTPError | undefined, req: Request, res: Response): void {
    this.logger.error([err?.stack, err?.status || err].filter(Boolean).join() || 'Unknown error occurred');

    // set locals, only providing error in development
    res.locals.message = err?.message;
    res.locals.error = this.exposeErrors ? err : {};
    res.status(err?.status || 500);
    this.render('error/error', req, res);
  }

  /**
   * Catch all for CSRF Token errors
   */
  public CSRFTokenError(req: Request, res: Response): void {
    res.status(403);
    this.render('error/csrf-token', req, res);
  }

  private render(templateName: string, req: Request, res: Response) {
    res.render(templateName, { ...commonContent[req.session['lang'] || 'en'] });
  }
}

export class HTTPError extends Error {
  constructor(public message: string, public status = 500) {
    super(message);
    this.name = 'HTTPError';
    this.status = status;
  }
}

