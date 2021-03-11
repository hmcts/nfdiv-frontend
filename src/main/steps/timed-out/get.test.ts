import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { generatePageContent } from '../common/common.content';
import { TIMED_OUT_URL } from '../urls';

import { generateContent } from './content';
import { TimedOutGetController } from './get';

describe('TimedOutGetController', () => {
  const controller = new TimedOutGetController();

  test('Should destroy session and render timeout page', async () => {
    const req = mockRequest();
    req.originalUrl = TIMED_OUT_URL;
    const res = mockResponse();
    await controller.get(req, res);
    const language = 'en';

    expect(req.session.destroy).toBeCalled();
    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generatePageContent(language, generateContent),
    });
  });
});
