import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { GetController } from './GetController';

describe('GetController', () => {
  const controller = new GetController('home/home', {});

  test('Should render the home page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.render).toBeCalledWith('home/home', expect.anything());
  });
});
