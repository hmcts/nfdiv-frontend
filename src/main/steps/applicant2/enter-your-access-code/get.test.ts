import { defaultViewArgs } from '../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { DivorceOrDissolution } from '../../../app/case/definition';
import { generatePageContent } from '../../common/common.content';
import { HOME_URL } from '../../urls';

import { generateContent } from './content';
import { Applicant2AccessCodeGetController } from './get';

jest.mock('../../../app/auth/user/oidc');

describe('AccessCodeGetController', () => {
  const controller = new Applicant2AccessCodeGetController();
  const language = 'en';

  test.each([DivorceOrDissolution.DIVORCE, DivorceOrDissolution.DISSOLUTION])(
    'Should render the enter your access code page with %s content',
    async serviceType => {
      const userCase = {
        divorceOrDissolution: serviceType,
        id: '1234',
      };

      const req = mockRequest();
      (req.locals.api.getNewInviteCase as jest.Mock).mockResolvedValue(userCase);
      const res = mockResponse();
      res.locals.serviceType = serviceType;
      await controller.get(req, res);
      const isDivorce = serviceType === DivorceOrDissolution.DIVORCE;

      expect(res.render).toBeCalledWith(expect.anything(), {
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
    'Should redirect to HOME_URL if no invite case found',
    async serviceType => {
      const req = mockRequest();
      (req.locals.api.getNewInviteCase as jest.Mock).mockResolvedValue(false);
      const res = mockResponse();
      res.locals.serviceType = serviceType;
      await controller.get(req, res);

      expect(res.redirect).toBeCalledWith(HOME_URL);
    }
  );
});
