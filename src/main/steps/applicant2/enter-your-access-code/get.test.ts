import { defaultViewArgs } from '../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { DivorceOrDissolution } from '../../../app/case/definition';
import { SupportedLanguages } from '../../../modules/i18n';
import { generatePageContent } from '../../common/common.content';
import { HOME_URL } from '../../urls';

import { generateContent } from './content';
import { Applicant2AccessCodeGetController } from './get';

describe('AccessCodeGetController', () => {
  const controller = new Applicant2AccessCodeGetController();
  const language = SupportedLanguages.En;

  test.each([DivorceOrDissolution.DIVORCE, DivorceOrDissolution.DISSOLUTION])(
    'Should render the enter your access code page with %s content',
    async serviceType => {
      const req = mockRequest();
      req.session.existingCaseId = undefined as unknown as string;
      const res = mockResponse();
      res.locals.serviceType = serviceType;
      await controller.get(req, res);
      const isDivorce = serviceType === DivorceOrDissolution.DIVORCE;

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
