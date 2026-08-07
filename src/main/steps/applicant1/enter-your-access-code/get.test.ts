import { defaultViewArgs } from '../../../../test/unit/utils/defaultViewArgs.js';
import { mockRequest } from '../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../test/unit/utils/mockResponse.js';
import { DivorceOrDissolution } from '../../../app/case/definition.js';
import { SupportedLanguages } from '../../../modules/i18n/index.js';
import { HOME_URL } from '../../urls.js';

import { Applicant1AccessCodeGetController } from './get.js';

describe('AccessCodeGetController', () => {
  const controller = new Applicant1AccessCodeGetController();
  const language = SupportedLanguages.En;

  test.each([DivorceOrDissolution.DIVORCE, DivorceOrDissolution.DISSOLUTION])(
    'Should render the enter your access code page with %s content',
    async serviceType => {
      const req = mockRequest();
      req.session.existingCaseId = undefined as unknown as string;
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

  test.each([DivorceOrDissolution.DIVORCE, DivorceOrDissolution.DISSOLUTION])(
    'Should redirect to HOME_URL if applicant is already linked',
    async serviceType => {
      const req = mockRequest();
      req.session.existingCaseId = '123456789';
      const res = mockResponse();
      res.locals.serviceType = serviceType;
      await controller.get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
    }
  );
});
