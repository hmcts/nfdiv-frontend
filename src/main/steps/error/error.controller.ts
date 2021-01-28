import autobind from 'autobind-decorator';
import { AxiosError, AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { LoggerInstance } from 'winston';

import { commonContent } from '../common/common.content';

import { errorContent } from './content';

@autobind
export class ErrorController {
  constructor(private readonly logger: LoggerInstance) {}

  /**
   * Catch all for 404
   */
  public notFound(req: Request, res: Response): void {
    this.logger.info(`404 Not Found: ${req.originalUrl}`);

    res.status(StatusCodes.NOT_FOUND);
    this.render(req, res);
  }

  /**
   * Catch all for 500 errors
   */
  public internalServerError(error: HTTPError | AxiosError | string | undefined, req: Request, res: Response): void {
    const { message = error, stack = undefined } = typeof error === 'object' ? error : {};

    let response: AxiosResponse<string | Record<string, unknown>> | undefined;
    if (typeof error === 'object' && (error as AxiosError).isAxiosError) {
      response = (error as AxiosError).response?.data;
    }

    this.logger.error(`${stack || message}`, response);

    res.status((error as HTTPError)?.status || StatusCodes.INTERNAL_SERVER_ERROR);
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
