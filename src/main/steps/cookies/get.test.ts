import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CaseType } from '../../app/case/case';

import { generateContent } from './content';
import { CookiesGetController } from './get';

describe('CookiesGetController', () => {
  const controller = new CookiesGetController();

  test('Should render the cookie page with divorce content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...generateContent({ isDivorce: true }).en,
      formState: req.session.userCase,
    });
  });

  test('Should render the cookie page with civil content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = CaseType.Dissolution;
    await controller.get(req, res);

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...generateContent({ isDivorce: false }).en,
      formState: req.session.userCase,
    });
  });
});
