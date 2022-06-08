import { defaultViewArgs } from '../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseApi } from '../../../app/case/case-api';
import { DivorceOrDissolution } from '../../../app/case/definition';
import { generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
import { Applicant2AccessCodeGetController } from './get';

describe('AccessCodeGetController', () => {
  const controller = new Applicant2AccessCodeGetController();
  const language = 'en';

  test('Should render the enter your access code page with divorce content', async () => {
    const req = mockRequest();
    req.locals.api = {
      isAlreadyLinked: jest.fn().mockResolvedValue(false),
    } as unknown as CaseApi;
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

  test('Should render the enter your access code page with civil content', async () => {
    const req = mockRequest();
    req.locals.api = {
      isAlreadyLinked: jest.fn().mockResolvedValue(false),
    } as unknown as CaseApi;
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
