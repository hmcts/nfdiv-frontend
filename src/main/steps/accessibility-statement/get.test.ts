import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { AccessibilityStatementContent } from './content';
import { AccessibilityStatementGetController } from './get';
import { commonContent } from '../common/common.content';


describe('AccessibilityStatementGetController', () => {
  const controller = new AccessibilityStatementGetController();

  test('Should render the accessibility statement page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...AccessibilityStatementContent.en,
      ...AccessibilityStatementContent.common,
      ...commonContent.en,
      sessionErrors: []
    });
  });

});
