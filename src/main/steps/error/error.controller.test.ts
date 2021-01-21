import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { ErrorController, HTTPError } from './error.controller';
import { commonContent } from '../common/common.content';

describe('ErrorController', () => {
  const logger = {
    error: jest.fn()
  };

  afterEach(() => {
    logger.error.mockClear();
  });

  test('Should render error pages', async () => {
    const controller = new ErrorController(logger, true);

    const err = { status: 400, message: 'Bad request' } as unknown as HTTPError;
    const req = mockRequest();
    const res = mockResponse();
    await controller.internalServerError(err, req, res);

    expect(res.render).toBeCalledWith('error/error', commonContent.en);
    expect(res.statusCode).toBe(err.status);
  });

  test('Should render not found', async () => {
    const controller = new ErrorController(logger, true);

    const req = mockRequest();
    const res = mockResponse();
    await controller.notFound(req, res);

    expect(res.render).toBeCalledWith('error/not-found', commonContent.en);
  });

  test('Should render error pages but not expose details', async () => {
    const controller = new ErrorController(logger, false);

    const err = { message: 'Bad request' } as unknown as HTTPError;
    const req = mockRequest();
    const res = mockResponse();
    await controller.internalServerError(err, req, res);

    expect(res.render).toBeCalledWith('error/error', commonContent.en);
    expect(res.statusCode).toBe(500);
  });

  test('Renders the error page with correct status code and logs the details', async () => {
    const controller = new ErrorController(logger, false);

    const err = new HTTPError('Bad request', 400);
    const req = mockRequest();
    const res = mockResponse();
    await controller.internalServerError(err, req, res);

    expect(logger.error.mock.calls[0][0]).toContain('400,HTTPError: Bad request');
    expect(res.render).toBeCalledWith('error/error', commonContent.en);
    expect(res.statusCode).toBe(400);
  });

  test('Should render csrf token error page', async () => {
    const controller = new ErrorController(logger, false);

    const req = mockRequest();
    const res = mockResponse();
    await controller.CSRFTokenError(req, res);

    expect(res.render).toBeCalledWith('error/csrf-token', commonContent.en);
    expect(res.statusCode).toBe(403);
  });

});
