import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { commonContent } from '../../common/common.content';

import { marriageCertificateContent } from './content';
import { MarriageCertificateGetController } from './get';

describe('MarriageCertificateGetController', () => {
  const controller = new MarriageCertificateGetController();

  test('Should render the page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...marriageCertificateContent.en,
      ...marriageCertificateContent.common,
      ...commonContent.en,
      sessionErrors: [],
    });
  });
});
