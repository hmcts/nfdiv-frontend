import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { DivorceOrDissolution } from '../../app/case/definition';
import { SupportedLanguages } from '../../modules/i18n';
import { generatePageContent } from '../common/common.content';

import { generateContent } from './content';
import { ExistingApplicationGetController } from './get';

describe('ExistingApplicationGetController', () => {
  const controller = new ExistingApplicationGetController();
  const language = SupportedLanguages.En;

  test('Should render the existing application page with divorce content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    const isDivorce = true;

    expect(res.render).toHaveBeenCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...generatePageContent({
        language,
        pageContent: generateContent,
        isDivorce,
        userEmail: 'test@example.com',
        userCase: req.session.userCase,
        existingCaseId: req.session.existingCaseId,
      }),
      userCase: req.session.userCase,
    });
  });

  test('Should render the existing application page with civil content', async () => {
    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = DivorceOrDissolution.DISSOLUTION;
    await controller.get(req, res);
    const isDivorce = false;

    expect(res.render).toHaveBeenCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...generatePageContent({
        language,
        pageContent: generateContent,
        isDivorce,
        userEmail: 'test@example.com',
        userCase: req.session.userCase,
        existingCaseId: req.session.existingCaseId,
      }),
      userCase: req.session.userCase,
    });
  });
});
