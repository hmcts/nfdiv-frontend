import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs.js';
import { mockRequest } from '../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../test/unit/utils/mockResponse.js';
import { DivorceOrDissolution } from '../../app/case/definition.js';
import { SupportedLanguages } from '../../modules/i18n/index.js';

import { AccessibilityStatementGetController } from './get.js';

describe('AccessibilityStatementGetController', () => {
  const controller = new AccessibilityStatementGetController();
  const language = SupportedLanguages.En;

  test('Should render the accessibility statement page for divorce service', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith(expect.anything(), {
      ...controller.getPageContent(req, res, language),
      ...defaultViewArgs,
      isAmendableStates: undefined,
      userCase: req.session.userCase,
    });
  });

  test('Should render the accessibility statement page', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = DivorceOrDissolution.DISSOLUTION;

    await controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith(expect.anything(), {
      ...controller.getPageContent(req, res, language),
      ...defaultViewArgs,
      isAmendableStates: undefined,
      userCase: req.session.userCase,
    });
  });
});
