import { DivorceOrDissolution } from '@hmcts/nfdiv-case-definition';

import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { generateContent } from './content';
import { PrivacyPolicyGetController } from './get';

describe('PrivacyPolicyGetController', () => {
  const controller = new PrivacyPolicyGetController();

  test('Should render the privacy policy page with divorce content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generateContent({ isDivorce: true }).en,
      ...defaultViewArgs,
      formState: req.session.userCase,
    });
  });

  test('Should render the privacy policy page with civil content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = DivorceOrDissolution.DISSOLUTION;
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generateContent({ isDivorce: false }).en,
      ...defaultViewArgs,
      formState: req.session.userCase,
    });
  });
});
