import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { commonContent } from '../common/common.content';
import { CookiesGetController } from './get';
import { CookiesContent } from './content';

describe('RespondentAddressGetController', () => {
  const controller = new CookiesGetController();

  test('Should render the page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...CookiesContent.en,
      ...CookiesContent.common,
      ...commonContent.en,
      sessionErrors: []
    });
  });

});
