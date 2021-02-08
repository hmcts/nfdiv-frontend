import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { commonContent } from '../../steps/common/common.content';

import { GetController } from './GetController';

describe('GetController', () => {
  const controller = new GetController('home/home', { en: {}, cy: {}, common: {} });

  test('Should render the home page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('home/home', { ...commonContent.en, sessionErrors: [] });
  });

  test("Doesn't call render if an error page has already been rendered upstream", async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.isError = true;
    await controller.get(req, res);

    expect(res.render).not.toHaveBeenCalled();
  });
});
