import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CaseType } from '../../app/case/case';
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
      ...generateContent({ isDivorce: true, partner: '', formState: {} }).en,
      ...commonContent.en,
      formState: req.session.userCase,
      hideBackButton: false,
      hideNavigationButton: false,
      sessionErrors: [],
    });
  });

  test('Should render the accessibility statement page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = CaseType.Dissolution;

    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generateContent({ isDivorce: false, partner: '', formState: {} }).en,
      ...commonContent.en,
      formState: req.session.userCase,
      hideBackButton: false,
      hideNavigationButton: false,
      sessionErrors: [],
    });
  });
});
