import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CaseType } from '../../app/case/case';
import { commonContent } from '../common/common.content';

import { generateContent } from './content';
import { CookiesGetController } from './get';

describe('CookiesGetController', () => {
  const controller = new CookiesGetController();

  test('Should render the cookie page with divorce content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generateContent({ isDivorce: true }).en,
      ...commonContent.en,
      formState: req.session.userCase,
      hideBackButton: false,
      hideNavigationButton: false,
      sessionErrors: [],
    });
  });

  test('Should render the cookie page with civil content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = CaseType.Dissolution;
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...generateContent({ isDivorce: false }).en,
      ...commonContent.en,
      formState: req.session.userCase,
      hideBackButton: false,
      hideNavigationButton: false,
      sessionErrors: [],
    });
  });
});
