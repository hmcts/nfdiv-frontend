import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { DivorceOrDissolution } from '../../app/case/definition';
import { generatePageContent } from '../common/common.content';

import { generateContent } from './content';
import { ApplicationSubmittedGetController } from './get';

describe('ApplicationSubmittedGetController', () => {
  const controller = new ApplicationSubmittedGetController();
  const language = 'en';

  test('Should render the application submitted page with divorce content', async () => {
    const req = mockRequest();
    req.session.userCase.applicant1CannotUploadDocuments = [];
    req.session.userCase.applicant2CannotUploadDocuments = [];
    const res = mockResponse();
    await controller.get(req, res);
    const isDivorce = true;

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...generatePageContent({
        language,
        pageContent: generateContent,
        isDivorce,
        userEmail: 'test@example.com',
        userCase: req.session.userCase,
        pageUrl: '/request',
      }),
      userCase: req.session.userCase,
    });
  });

  test('Should render the application submitted page with civil content', async () => {
    const req = mockRequest();
    req.session.userCase.applicant1CannotUploadDocuments = [];
    const res = mockResponse();
    res.locals.serviceType = DivorceOrDissolution.DISSOLUTION;
    await controller.get(req, res);
    const isDivorce = false;

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...generatePageContent({
        language,
        pageContent: generateContent,
        isDivorce,
        userEmail: 'test@example.com',
        userCase: req.session.userCase,
        pageUrl: '/request',
      }),
      userCase: req.session.userCase,
    });
  });
});
