import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CHECK_ANSWERS_URL } from '../urls';

import PayYourFeeGetController from './get';

describe('PayYourFeeGetController', () => {
  const controller = new PayYourFeeGetController();

  it('redirects to check your answers if the application state is not awaiting payment', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(CHECK_ANSWERS_URL);
  });
});
