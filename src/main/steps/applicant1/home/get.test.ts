import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { DivorceOrDissolution } from '../../../app/case/definition';
import { CHECK_ANSWERS_URL, YOUR_DETAILS_URL, YOU_NEED_TO_REVIEW_YOUR_APPLICATION } from '../../urls';

import { HomeGetController } from './get';

describe('HomeGetController', () => {
  const controller = new HomeGetController();

  test('redirects to the first question for new users', () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          mockQuestion: 'mockExistingAnswer',
        },
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(YOUR_DETAILS_URL);
  });

  test('redirects to the check your answers page for existing users', () => {
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
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CHECK_ANSWERS_URL);
  });

  test('throws an error if the user switches service type', () => {
    const req = mockRequest();
    const res = mockResponse({
      locals: { serviceType: DivorceOrDissolution.DISSOLUTION },
    });

    expect(() => controller.get(req, res)).toThrowError(new Error('Invalid case type'));
  });

  test("redirects to applicant 2's first question for new applicant 2 users", () => {
    const req = mockRequest({
      session: {
        userCase: {
          id: '123',
          divorceOrDissolution: DivorceOrDissolution.DIVORCE,
          mockQuestion: 'mockExistingAnswer',
        },
        isApplicant2: true,
      },
    });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toBeCalledWith(YOU_NEED_TO_REVIEW_YOUR_APPLICATION);
  });
});
