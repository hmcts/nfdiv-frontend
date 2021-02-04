import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { commonContent } from '../../common/common.content';

import { certificateContent } from './content';
import { CertificateGetController } from './get';

describe('CertificateGetController', () => {
  const controller = new CertificateGetController();

  test('Should render the divorce page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = 'divorce';
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...certificateContent.divorce.en,
      ...certificateContent.common,
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
      ...certificateContent.civil.en,
      ...certificateContent.common,
      ...commonContent.en,
      sessionErrors: [],
    });
  });
});
