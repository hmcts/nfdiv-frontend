import { DivorceOrDissolution } from '@hmcts/nfdiv-case-definition';

import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';

import { generateContent } from './content';
import { AccessibilityStatementGetController } from './get';

describe('AccessibilityStatementGetController', () => {
  const controller = new AccessibilityStatementGetController();

  test('Should render the accessibility statement page for divorce service', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...generateContent({ isDivorce: true, partner: '' }).en,
      formState: req.session.userCase,
    });
  });

  test('Should render the accessibility statement page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = DivorceOrDissolution.DISSOLUTION;

    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...generateContent({ isDivorce: false, partner: '' }).en,
      formState: req.session.userCase,
    });
  });
});
