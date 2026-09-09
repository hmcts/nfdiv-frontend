import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs.js';
import { mockRequest } from '../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../test/unit/utils/mockResponse.js';
import { DivorceOrDissolution } from '../../app/case/definition.js';
import { SupportedLanguages } from '../../modules/i18n/index.js';

import { CookiesGetController } from './get.js';

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
      isAmendableStates: undefined,
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
      isAmendableStates: undefined,
      serviceName: 'Apply to end a civil partnership',
      userCase: req.session.userCase,
    });
  });
});
