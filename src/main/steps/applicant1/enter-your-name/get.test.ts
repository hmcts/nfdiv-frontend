import { defaultViewArgs } from '../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { DivorceOrDissolution } from '../../../app/case/definition';
import { generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
import EnterYourNameGetController from './get';

describe('EnterYourNameGetController', () => {
  const controller = new EnterYourNameGetController('page', generateContent);
  const language = 'en';
  const user = {
    accessToken: '1234',
    email: 'test@example.com',
    givenName: 'firstName',
    familyName: 'lastName',
    id: '1234',
  };

  test('Should render the enter your name page with users first and last name with divorce content', async () => {
    const req = mockRequest();
    req.session.user = user;
    const res = mockResponse();
    await controller.get(req, res);
    const isDivorce = true;

    expect(res.render).toBeCalledWith('page', {
      ...defaultViewArgs,
      ...generatePageContent({ language, pageContent: generateContent, isDivorce, userEmail: 'test@example.com' }),
      formState: req.session.userCase,
    });
    expect(req.session.userCase.applicant1FirstNames).toBe(user.givenName);
    expect(req.session.userCase.applicant1LastNames).toBe(user.familyName);
  });

  test('Should render the enter your name page with users first and last name with civil content', async () => {
    const req = mockRequest();
    req.session.user = user;
    const res = mockResponse();
    res.locals.serviceType = DivorceOrDissolution.DISSOLUTION;
    await controller.get(req, res);
    const isDivorce = false;

    expect(res.render).toBeCalledWith(expect.anything(), {
      ...defaultViewArgs,
      ...generatePageContent({ language, pageContent: generateContent, isDivorce, userEmail: 'test@example.com' }),
      formState: req.session.userCase,
    });
    expect(req.session.userCase.applicant1FirstNames).toBe(user.givenName);
    expect(req.session.userCase.applicant1LastNames).toBe(user.familyName);
  });
});
