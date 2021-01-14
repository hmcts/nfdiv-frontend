import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { TermsAndConditionsGetController } from './get';
import { commonContent } from '../common/common.content';
import { TermsAndConditionsContent } from './content';

describe('TermsAndConditionsGetController', () => {
  const controller = new TermsAndConditionsGetController();

  test('Should render the accessibility statement page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...TermsAndConditionsContent.en,
      ...TermsAndConditionsContent.common,
      ...commonContent.en,
      sessionErrors: []
    });
  });

});
