import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { DivorceOrDissolution } from '../../app/case/definition';
import { SupportedLanguages } from '../../modules/i18n';

import { CookiesGetController } from './get';

describe('CookiesGetController', () => {
  const controller = new CookiesGetController();
  const language = SupportedLanguages.En;

  test('Should render the cookie page with divorce content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith(expect.anything(), {
      ...controller.getPageContent(req, res, language),
      ...defaultViewArgs,
      serviceName: 'Apply for a divorce',
      userCase: req.session.userCase,
    });
  });

  test('Should render the cookie page with civil content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = DivorceOrDissolution.DISSOLUTION;
    await controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith(expect.anything(), {
      ...controller.getPageContent(req, res, language),
      ...defaultViewArgs,
      serviceName: 'Apply to end a civil partnership',
      userCase: req.session.userCase,
    });
  });
});
