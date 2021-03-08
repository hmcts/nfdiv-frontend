import { DivorceOrDissolution } from '@hmcts/nfdiv-case-definition';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CHECK_ANSWERS_URL, YOUR_DETAILS_URL } from '../urls';

import { HomeGetController } from './get';

describe('HomeGetController', () => {
  const controller = new HomeGetController();

  test('redirects to the first question for new users', async () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        },
      },
    });
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.redirect).toBeCalledWith(YOUR_DETAILS_URL);
  });

  test('redirects to the check your answers page for existing users', async () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          gender: 'male',
        },
      },
    });
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CHECK_ANSWERS_URL);
  });

  test('throws an error if the user switches service type', async () => {
    const req = mockRequest();
    const res = mockResponse({
      locals: { serviceType: DivorceOrDissolution.DISSOLUTION },
    });

    expect(() => controller.get(req, res)).toThrowError(new Error('Invalid case type'));
  });
});
