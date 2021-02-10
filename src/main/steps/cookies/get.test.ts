import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { commonContent } from '../common/common.content';

import { generateContent } from './content';
import { CookiesGetController } from './get';

describe('RespondentAddressGetController', () => {
  const controller = new CookiesGetController();

  test('Should render the cookie page with divorce content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generateContent(true).en,
      ...commonContent.en,
      sessionErrors: [],
    });
  });

  test('Should render the cookie page with civil content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = 'civil';
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generateContent(false).en,
      ...commonContent.en,
      sessionErrors: [],
    });
  });
});
