import type { LoggerInstance } from 'winston';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { commonContent } from '../common/common.content';
import { errorContent } from './content';
import { ErrorController, HTTPError } from './error.controller';

describe('ErrorController', () => {
  const logger = {
    warn: jest.fn(),
    error: jest.fn()
  };

  afterEach(() => {
    logger.warn.mockClear();
    logger.error.mockClear();
  });

  test('Should render not found', async () => {
    const controller = new ErrorController(logger as unknown as LoggerInstance);

    const req = mockRequest();
    const res = mockResponse();
    await controller.notFound(req, res);

    expect(logger.warn.mock.calls[0][0]).toContain('404 Not Found: /request');
    expect(res.statusCode).toBe(404);
    expect(res.render).toBeCalledWith('error/error', { ...commonContent.en, ...errorContent.en[404] });
  });

  test('Should render error page with supplied status code', async () => {
    const controller = new ErrorController(logger as unknown as LoggerInstance);

    const err = { status: 400, message: 'Bad request' } as unknown as HTTPError;
    const req = mockRequest();
    const res = mockResponse();
    await controller.internalServerError(err, req, res);

    expect(logger.error.mock.calls[0][0]).toContain('Bad request');
    expect(res.statusCode).toBe(err.status);
    expect(res.render).toBeCalledWith('error/error', { ...commonContent.en, ...errorContent.en[400] });
  });

  test('Should render error pages and fall back to a 500 error if status not given', async () => {
    const controller = new ErrorController(logger as unknown as LoggerInstance);

    const err = { message: 'Bad request' } as unknown as HTTPError;
    const req = mockRequest();
    const res = mockResponse();
    await controller.internalServerError(err, req, res);

    expect(logger.error.mock.calls[0][0]).toContain('Bad request');
    expect(res.statusCode).toBe(500);
    expect(res.render).toBeCalledWith('error/error', { ...commonContent.en, ...errorContent.en[500] });
  });

  test('Renders the error page with correct status code and logs the details', async () => {
    const controller = new ErrorController(logger as unknown as LoggerInstance);

    const err = new HTTPError('Bad request', 400);
    const req = mockRequest();
    const res = mockResponse();
    await controller.internalServerError(err, req, res);

    expect(logger.error.mock.calls[0][0]).toContain('HTTPError: Bad request');
    expect(res.statusCode).toBe(400);
    expect(res.render).toBeCalledWith('error/error', { ...commonContent.en, ...errorContent.en[400] });
  });

  test('Should render CSRF token error page', async () => {
    const controller = new ErrorController(logger as unknown as LoggerInstance);

    const req = mockRequest();
    const res = mockResponse();
    await controller.CSRFTokenError(req, res);

    expect(logger.error.mock.calls[0][0]).toContain('CSRF Token Failed');
    expect(res.statusCode).toBe(400);
    expect(res.render).toBeCalledWith('error/error', { ...commonContent.en, ...errorContent.en[400] });
  });

});
