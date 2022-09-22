import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { SupportedLanguages } from '../../modules/i18n';
import { generatePageContent } from '../../steps/common/common.content';
import { ApplicationType, DivorceOrDissolution, Gender, State } from '../case/definition';

import { GetController } from './GetController';

describe('GetController', () => {
  const languages = {
    en: {
      text: 'english',
    },
    cy: {
      text: 'welsh',
    },
  };
  const userEmail = 'test@example.com';
  const generateContent = content => languages[content.language];
  test('Should render the page', async () => {
    const controller = new GetController('page', generateContent);

    const req = mockRequest({ userCase: { state: State.Draft } });
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith('page', {
      ...defaultViewArgs,
      language: SupportedLanguages.En,
      serviceName: 'Apply for a divorce',
      isAmendableStates: true,
      isDivorce: true,
      text: 'english',
      userCase: req.session.userCase,
      userEmail,
    });
  });

  test('Detects when application is not in a draft state', async () => {
    const controller = new GetController('page', () => ({}));

    const req = mockRequest({ userCase: { state: State.AwaitingPayment } });
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith('page', {
      ...defaultViewArgs,
      isAmendableStates: false,
    });
  });

  describe('Getting the users preferred language', () => {
    test('Language via query string', async () => {
      const controller = new GetController('page', generateContent);

      const language = SupportedLanguages.Cy;
      const req = mockRequest();
      const res = mockResponse();
      req.session.lang = language;
      await controller.get(req, res);

      expect(res.render).toHaveBeenCalledWith('page', {
        ...defaultViewArgs,
        ...generatePageContent({ language, pageContent: generateContent, userEmail, userCase: req.session.userCase }),
        text: 'welsh',
        language: SupportedLanguages.Cy,
        htmlLang: SupportedLanguages.Cy,
        userCase: req.session.userCase,
        userEmail,
        existingCaseId: req.session.existingCaseId,
      });
    });

    test('Language via session', async () => {
      const controller = new GetController('page', generateContent);

      const language = SupportedLanguages.Cy;
      const req = mockRequest();
      const res = mockResponse();
      req.session.lang = language;
      await controller.get(req, res);

      expect(res.render).toHaveBeenCalledWith('page', {
        ...defaultViewArgs,
        ...generatePageContent({ language, pageContent: generateContent, userEmail, userCase: req.session.userCase }),
        text: 'welsh',
        language: SupportedLanguages.Cy,
        htmlLang: SupportedLanguages.Cy,
        userCase: req.session.userCase,
        userEmail,
        existingCaseId: req.session.existingCaseId,
      });
    });

    test('Language via browser settings', async () => {
      const controller = new GetController('page', generateContent);

      const language = SupportedLanguages.Cy;
      const req = mockRequest({ headers: { 'accept-language': language } });
      const res = mockResponse();
      req.session.lang = language;
      await controller.get(req, res);

      expect(res.render).toHaveBeenCalledWith('page', {
        ...defaultViewArgs,
        ...generatePageContent({ language, pageContent: generateContent, userEmail, userCase: req.session.userCase }),
        text: 'welsh',
        language: SupportedLanguages.Cy,
        htmlLang: SupportedLanguages.Cy,
        userCase: req.session.userCase,
        userEmail,
        existingCaseId: req.session.existingCaseId,
      });
    });
  });

  test("Doesn't call render if an error page has already been rendered upstream", async () => {
    const controller = new GetController('page', generateContent);

    const req = mockRequest();
    const res = mockResponse();
    res.locals.isError = true;
    await controller.get(req, res);

    expect(res.render).not.toHaveBeenCalled();
  });

  test("Doesn't call render if headers have already been sent already upstream", async () => {
    const controller = new GetController('page', generateContent);

    const req = mockRequest();
    const res = mockResponse();
    res.headersSent = true;
    await controller.get(req, res);

    expect(res.render).not.toHaveBeenCalled();
  });

  test('sends the current page form session state to the view', async () => {
    const controller = new GetController('page', generateContent);

    const req = mockRequest();
    const res = mockResponse();
    req.session.userCase.gender = Gender.FEMALE;
    await controller.get(req, res);

    expect(res.render).toHaveBeenCalledWith('page', {
      ...defaultViewArgs,
      userCase: {
        id: '1234',
        divorceOrDissolution: 'divorce',
        gender: Gender.FEMALE,
      },
      text: 'english',
      userEmail,
    });
  });

  describe('generatePageContent()', () => {
    test('calls generatePageContent with correct arguments for new sessions', async () => {
      const getContentMock = jest.fn().mockReturnValue({});
      const controller = new GetController('page', getContentMock);

      const req = mockRequest({ userCase: { state: State.Draft } });
      req.session.inviteCaseApplicationType = ApplicationType.SOLE_APPLICATION;
      const res = mockResponse();
      await controller.get(req, res);

      const commonContent = generatePageContent({
        language: SupportedLanguages.En,
        userEmail,
        userCase: req.session.userCase,
      });

      expect(getContentMock).toHaveBeenCalledTimes(1);
      expect(getContentMock).toHaveBeenCalledWith({
        ...commonContent,
        language: SupportedLanguages.En,
        isDivorce: true,
        userCase: req.session.userCase,
        partner: 'spouse',
        userEmail,
        existingCaseId: req.session.existingCaseId,
        inviteCaseApplicationType: req.session.inviteCaseApplicationType,
      });
      expect(res.render).toHaveBeenCalledWith('page', {
        ...defaultViewArgs,
        isAmendableStates: true,
        userCase: req.session.userCase,
        inviteCaseApplicationType: req.session.inviteCaseApplicationType,
      });
    });

    describe.each([
      { serviceType: DivorceOrDissolution.DIVORCE, isDivorce: true },
      { serviceType: DivorceOrDissolution.DISSOLUTION, isDivorce: false, civilKey: 'civilPartner' },
    ])('Service type %s', ({ serviceType, isDivorce }) => {
      describe.each([SupportedLanguages.En, SupportedLanguages.Cy])('Language %s', language => {
        test.each([
          { gender: Gender.MALE, partnerKey: 'husband' },
          { gender: Gender.FEMALE, partnerKey: 'wife' },
          { partnerKey: 'partner' },
        ])('calls getContent with correct arguments %s selected', async ({ gender }) => {
          const getContentMock = jest.fn().mockReturnValue({ pageText: `something in ${language}` });
          const controller = new GetController('page', getContentMock);

          const req = mockRequest({ session: { lang: language, userCase: { gender } } });
          const res = mockResponse({ locals: { serviceType } });
          await controller.get(req, res);

          const commonContent = generatePageContent({
            language,
            pageContent: getContentMock,
            isDivorce,
            userCase: { gender },
            userEmail,
          });

          expect(getContentMock).toHaveBeenCalledTimes(2);
          expect(getContentMock).toHaveBeenCalledWith({
            ...commonContent,
            isDivorce,
            language,
            userCase: req.session.userCase,
          });
          expect(res.render).toHaveBeenCalledWith('page', {
            ...defaultViewArgs,
            ...commonContent,
            isDivorce,
            userCase: req.session.userCase,
            language,
            pageText: `something in ${language}`,
            userEmail,
            existingCaseId: req.session.existingCaseId,
          });
        });
      });
    });
  });
});
