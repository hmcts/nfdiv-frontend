import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { commonContent } from '../../common/common.content';

import { noMarriageCertificateContent } from './content';
import { noMarriageCertificateGetController } from './get';

describe('noMarriageCertificateGetController', () => {
  const controller = new noMarriageCertificateGetController();

  test('Should render the divorce page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = 'divorce';
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...noMarriageCertificateContent.divorce.en,
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
      ...noMarriageCertificateContent.civil.en,
      ...commonContent.en,
      sessionErrors: [],
    });
  });
});
