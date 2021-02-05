import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { LANGUAGE_PREFERENCE_URL } from '../urls';

import { HomeGetController } from './get';

describe('HomeGetController', () => {
  const controller = new HomeGetController();

  test('Should render the home page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.redirect).toBeCalledWith(LANGUAGE_PREFERENCE_URL);
  });
});
