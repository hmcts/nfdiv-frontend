import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { commonContent } from '../../common/common.content';

import { hasMarriageBrokenContent } from './content';
import { HasMarriageBrokenGetController } from './get';

describe('HasMarriageBrokenGetController', () => {
  const controller = new HasMarriageBrokenGetController();

  test('Should render the page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...hasMarriageBrokenContent.en,
      ...hasMarriageBrokenContent.common,
      ...commonContent.en,
      sessionErrors: [],
    });
  });
});
