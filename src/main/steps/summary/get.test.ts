import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { commonContent } from '../common/common.content';

import { summaryContent } from './content';
import { SummaryGetController } from './get';

describe('SummaryGetController', () => {
  const controller = new SummaryGetController();

  test('Should render the summary page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...summaryContent.en,
      ...summaryContent.common,
      ...commonContent.en,
      hideBackButton: false,
      formState: req.session.userCase,
      sessionErrors: [],
    });
  });
});
