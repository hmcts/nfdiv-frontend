import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs.js';
import { mockRequest } from '../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../test/unit/utils/mockResponse.js';
import { DivorceOrDissolution } from '../../app/case/definition.js';
import { SupportedLanguages } from '../../modules/i18n/index.js';

import { SwitchToSoleApplicationGetController } from './get.js';

describe('SwitchToSoleApplicationGetController', () => {
  const controller = new SwitchToSoleApplicationGetController();
  const language = SupportedLanguages.En;

  test('Should render the switch to sole application page with divorce content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...controller.getPageContent(req, res, language),
      userCase: req.session.userCase,
    });
  });

  test('Should render the switch to sole application page with civil content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = DivorceOrDissolution.DISSOLUTION;
    await controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...controller.getPageContent(req, res, language),
      userCase: req.session.userCase,
    });
  });
});
