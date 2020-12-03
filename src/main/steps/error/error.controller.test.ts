import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { ErrorController } from './error.controller';

describe('ErrorController', () => {
  const logger = {
    error: async (message: string) => message
  } as any;

  test('Should render error pages', async () => {
    const controller = new ErrorController(logger, true);

    const err = { status: 400, message: 'Bad request' } as any;
    const req = mockRequest();
    const res = mockResponse();
    await controller.internalServerError(err, req, res);

    expect(res.render).toBeCalledWith('error/error');
    expect(res.statusCode).toBe(err.status);
  });

  test('Should render not found', async () => {
    const controller = new ErrorController(logger, true);

    const req = mockRequest();
    const res = mockResponse();
    await controller.notFound(req, res);

    expect(res.render).toBeCalledWith('error/not-found');
  });

  test('Should render error pages but not expose details', async () => {
    const controller = new ErrorController(logger, false);

    const err = { message: 'Bad request' } as any;
    const req = mockRequest();
    const res = mockResponse();
    await controller.internalServerError(err, req, res);

    expect(res.render).toBeCalledWith('error/error');
    expect(res.statusCode).toBe(500);
  });

});
