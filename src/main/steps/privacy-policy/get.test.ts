import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { privacyPolicyContent } from './content';
import { PrivacyPolicyGetController } from './get';
import { commonContent } from '../common/common.content';


describe('PrivacyPolicyGetController', () => {
  const controller = new PrivacyPolicyGetController();

  test('Should render the home page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...privacyPolicyContent.en,
      ...privacyPolicyContent.common,
      ...commonContent.en,
      sessionErrors: []
    });
  });

});
