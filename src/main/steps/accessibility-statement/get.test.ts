import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { commonContent } from '../common/common.content';

import { generateContent } from './content';
import { AccessibilityStatementGetController } from './get';

describe('AccessibilityStatementGetController', () => {
  const controller = new AccessibilityStatementGetController();

  test('Should render the accessibility statement page for divorce service', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generateContent(true).en,
      ...commonContent.en,
      sessionErrors: [],
    });
  });

  test('Should render the accessibility statement page', async () => {
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
