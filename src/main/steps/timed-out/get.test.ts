import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { timedOutContent } from './content';
import { TimedOutGetController } from './get';

describe('TimedOutGetController', () => {
  const controller = new TimedOutGetController();

  test('Should destroy session and render timeout page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(req.session.destroy).toBeCalled();
    expect(res.render).toHaveBeenCalledWith(`${__dirname}/template`, {
      ...defaultViewArgs,
      ...timedOutContent.en,
    });
  });
});
