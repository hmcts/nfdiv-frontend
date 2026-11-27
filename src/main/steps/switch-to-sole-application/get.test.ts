import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { DivorceOrDissolution } from '../../app/case/definition';
import { SupportedLanguages } from '../../modules/i18n';
import { getPageTitleIdFromUrl } from '../url-utils';
import { SWITCH_TO_SOLE_APPLICATION } from '../urls';

import { SwitchToSoleApplicationGetController } from './get';

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
      titleId: getPageTitleIdFromUrl(SWITCH_TO_SOLE_APPLICATION),
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
      titleId: getPageTitleIdFromUrl(SWITCH_TO_SOLE_APPLICATION),
    });
  });
});
