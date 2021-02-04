import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { commonContent } from '../../common/common.content';

import { noCertificateContent } from './content';
import { noCertificateGetController } from './get';

describe('noCertificateGetController', () => {
  const controller = new noCertificateGetController();

  test('Should render the divorce page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = 'divorce';
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...noCertificateContent.divorce.en,
      ...commonContent.en,
      sessionErrors: [],
    });
  });

  test('Should render the civil page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = 'civil';
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...noCertificateContent.civil.en,
      ...commonContent.en,
      sessionErrors: [],
    });
  });
});
