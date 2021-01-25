import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { currentEventLoopEnd } from '../../../../test/unit/utils/currentEventLoopEnd';
import { commonContent } from '../../common/common.content';
import { HasMarriageBrokenGetController } from './get';
import { hasMarriageBrokenContent } from './content';

describe('HasMarriageBrokenGetController', () => {
  const controller = new HasMarriageBrokenGetController();

  test('Should render the page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    await currentEventLoopEnd();

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...hasMarriageBrokenContent.en,
      ...hasMarriageBrokenContent.common,
      ...commonContent.en,
      sessionErrors: []
    });
  });

});
