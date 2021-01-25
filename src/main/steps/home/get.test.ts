import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { currentEventLoopEnd } from '../../../test/unit/utils/currentEventLoopEnd';
import { homeContent } from './content';
import { HomeGetController } from './get';
import { commonContent } from '../common/common.content';

describe('HomeGetController', () => {
  const controller = new HomeGetController();

  test('Should render the home page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    await currentEventLoopEnd();

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...homeContent.common,
      ...commonContent.en,
      sessionErrors: []
    });
  });

});
