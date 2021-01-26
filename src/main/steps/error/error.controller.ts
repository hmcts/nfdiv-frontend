import { Request, Response } from 'express';
import autobind from 'autobind-decorator';
import { StatusCodes } from 'http-status-codes';

import { commonContent } from '../common/common.content';

import { errorContent } from './content';

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
    this.logger.error(`404 Not Found: ${req.originalUrl}`);

    res.status(StatusCodes.NOT_FOUND);
    this.render(req, res);
  }

  /**
   * Catch all for 500 errors
   */
  public internalServerError(error: HTTPError | string | undefined, req: Request, res: Response): void {
    const { message = error, stack = '', status = null } = typeof error === 'object' ? error : {};

    this.logger.error([stack, status, message].filter(Boolean).join() || 'Unknown error occurred');

    // set locals, only providing error in development
    res.locals.message = message;
    res.locals.error = this.exposeErrors ? error : {};
    res.status(status || StatusCodes.INTERNAL_SERVER_ERROR);
    this.render(req, res);
  }

  /**
   * Catch all for CSRF Token errors
   */
  public CSRFTokenError(req: Request, res: Response): void {
    this.logger.error('CSRF Token Failed');

    res.status(StatusCodes.BAD_REQUEST);
    this.render(req, res);
  }

  private render(req: Request, res: Response) {
    const lang = req.session['lang'] || 'en';
    const errorText = errorContent[lang][res.statusCode] || errorContent[lang][StatusCodes.INTERNAL_SERVER_ERROR];
    res.locals.isError = true;
    res.render('error/error', { ...commonContent[lang], ...errorText });
  }
}

export class HTTPError extends Error {
  constructor(public message: string, public status = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = 'HTTPError';
    this.status = status;
  }
}
