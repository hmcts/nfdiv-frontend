import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { FirstPageGet } from './first-page.get';

describe('FirstPageGetController', () => {
  const controller = new FirstPageGet();

  test('Should populate API data', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.locals.someApiResponse).toStrictEqual({ data: 'some data' });
  });

});
