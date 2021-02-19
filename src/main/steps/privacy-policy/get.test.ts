import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { commonContent } from '../common/common.content';

import { privacyPolicyContent } from './content';
import { PrivacyPolicyGetController } from './get';

describe('PrivacyPolicyGetController', () => {
  const controller = new PrivacyPolicyGetController();

  test('Should render the privacy policy page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...privacyPolicyContent.en,
      ...privacyPolicyContent.common,
      ...commonContent.en,
      hideBackButton: false,
      formState: req.session.userCase,
      sessionErrors: [],
    });
  });
});
