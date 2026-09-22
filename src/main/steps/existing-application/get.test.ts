import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs.js';
import { mockRequest } from '../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../test/unit/utils/mockResponse.js';
import { ApplicationType, DivorceOrDissolution } from '../../app/case/definition.js';
import { PageContent } from '../../app/controller/GetController.js';
import { SupportedLanguages } from '../../modules/i18n/index.js';

import { ExistingApplicationGetController } from './get.js';

describe('ExistingApplicationGetController', () => {
  const controller = new ExistingApplicationGetController();
  const language = SupportedLanguages.En;

  test.each([DivorceOrDissolution.DIVORCE, DivorceOrDissolution.DISSOLUTION])(
    'Should render the existing application page with %s content',
    async serviceType => {
      const req = mockRequest();
      const res = mockResponse();
      res.locals.serviceType = serviceType;

      await controller.get(req, res);

      expect(res.render).toHaveBeenCalledWith(expect.anything(), {
        ...defaultViewArgs,
        ...controller.getPageContent(req, res, language),
        userCase: req.session.userCase,
      });
    }
  );

  test.each([
    [false, expect.anything()],
    [true, undefined],
  ])('Should render the existing application page with %s form', async (cannotLinkToNewCase, expectedForm) => {
    const req = mockRequest();
    const res = mockResponse();
    req.session.cannotLinkToNewCase = cannotLinkToNewCase;

    await controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        form: expectedForm,
      })
    );
  });

  test('Should get page content', () => {
    const req = mockRequest();
    const res = mockResponse();
    req.session.existingCaseId = '123456789';
    req.session.inviteCaseApplicationType = ApplicationType.SOLE_APPLICATION;
    req.session.existingApplicationType = ApplicationType.JOINT_APPLICATION;

    const pageContent: PageContent = controller.getPageContent(req, res, language);

    expect(pageContent.existingCaseId).toBe('123456789');
    expect(pageContent.inviteCaseApplicationType).toBe(ApplicationType.SOLE_APPLICATION);
    expect(pageContent.existingApplicationType).toBe(ApplicationType.JOINT_APPLICATION);
    expect(pageContent.cannotLinkToNewCase).toBeFalsy();
  });
});
