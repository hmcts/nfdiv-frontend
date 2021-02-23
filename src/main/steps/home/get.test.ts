import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CaseType } from '../../app/case/case';
import { YOUR_DETAILS_URL } from '../urls';

import { HomeGetController } from './get';

describe('HomeGetController', () => {
  const controller = new HomeGetController();

  test('Should render the home page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.redirect).toBeCalledWith(YOUR_DETAILS_URL);
  });

  test('resets user case if the service type has changed', async () => {
    const req = mockRequest({ userCase: { emptyThisAnswer: 'I had filled out' } });
    const res = mockResponse({
      locals: { serviceType: CaseType.Dissolution },
    });
    expect(() => controller.get(req, res)).toThrowError(new Error('Invalid case type'));
  });
});
