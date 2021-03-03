import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { commonContent } from '../common/common.content';

import { termsAndConditionsContent } from './content';
import { TermsAndConditionsGetController } from './get';

describe('TermsAndConditionsGetController', () => {
  const controller = new TermsAndConditionsGetController();

  test('Should render the accessibility statement page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...termsAndConditionsContent.en,
      ...termsAndConditionsContent.common,
      ...commonContent.en,
      formState: req.session.userCase,
      hideBackButton: false,
      sessionErrors: [],
    });
  });
});
