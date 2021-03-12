import { DivorceOrDissolution, Gender } from '@hmcts/nfdiv-case-definition';

import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { Language, generatePageContent } from '../../steps/common/common.content';

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
  const generateContent = content => languages[content.language];
  test('Should render the page', async () => {
    const controller = new GetController('page', generateContent);

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('page', {
      ...defaultViewArgs,
      text: 'english',
      formState: req.session.userCase,
    });
  });

  describe('Getting the users preferred language', () => {
    test('Language via query string', async () => {
      const controller = new GetController('page', generateContent);

      const language = 'cy';
      const req = mockRequest();
      const res = mockResponse();
      req.query.lng = language;
      await controller.get(req, res);

      expect(res.render).toBeCalledWith('page', {
        ...defaultViewArgs,
        ...generatePageContent(language, generateContent),
        text: 'welsh',
        language: 'cy',
        htmlLang: 'cy',
        formState: req.session.userCase,
      });
    });

    test('Language via session', async () => {
      const controller = new GetController('page', generateContent);

      const language = 'cy';
      const req = mockRequest();
      const res = mockResponse();
      req.session.lang = language;
      await controller.get(req, res);

      expect(res.render).toBeCalledWith('page', {
        ...defaultViewArgs,
        ...generatePageContent(language, generateContent),
        text: 'welsh',
        language: 'cy',
        htmlLang: 'cy',
        formState: req.session.userCase,
      });
    });

    test('Language via browser settings', async () => {
      const controller = new GetController('page', generateContent);

      const language = 'cy';
      const req = mockRequest({ headers: { 'accept-language': language } });
      const res = mockResponse();
      req.query.lng = language;
      await controller.get(req, res);

      expect(res.render).toBeCalledWith('page', {
        ...defaultViewArgs,
        ...generatePageContent(language, generateContent),
        text: 'welsh',
        language: 'cy',
        htmlLang: 'cy',
        formState: req.session.userCase,
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

    expect(res.render).toBeCalledWith('page', {
      ...defaultViewArgs,
      formState: {
        id: '1234',
        divorceOrDissolution: 'divorce',
        gender: Gender.FEMALE,
      },
      text: 'english',
    });
  });

  describe('generatePageContent()', () => {
    test('calls generatePageContent with correct arguments for new sessions', async () => {
      const getContentMock = jest.fn().mockReturnValue({});
      const controller = new GetController('page', getContentMock);

      const req = mockRequest();
      const res = mockResponse();
      await controller.get(req, res);

      const commonContent = generatePageContent('en');

      expect(getContentMock).toHaveBeenCalledTimes(1);
      expect(getContentMock).toHaveBeenCalledWith({
        ...commonContent,
        language: 'en',
        isDivorce: true,
        formState: req.session.userCase,
        partner: 'partner',
      });
      expect(res.render).toBeCalledWith('page', {
        ...defaultViewArgs,
        formState: req.session.userCase,
      });
    });

    describe.each([
      { serviceType: DivorceOrDissolution.DIVORCE, isDivorce: true },
      { serviceType: DivorceOrDissolution.DISSOLUTION, isDivorce: false, civilKey: 'civilPartner' },
    ])('Service type %s', ({ serviceType, isDivorce }) => {
      describe.each(['en', 'cy'] as Language[])('Language %s', lang => {
        test.each([
          { gender: Gender.MALE, partnerKey: 'husband' },
          { gender: Gender.FEMALE, partnerKey: 'wife' },
          { partnerKey: 'partner' },
        ])('calls getContent with correct arguments %s selected', async ({ gender }) => {
          const getContentMock = jest.fn().mockReturnValue({ pageText: `something in ${lang}` });
          const controller = new GetController('page', getContentMock);

          const req = mockRequest({ session: { lang, userCase: { gender } } });
          const res = mockResponse({ locals: { serviceType } });
          await controller.get(req, res);

          const commonContent = generatePageContent(lang, getContentMock, isDivorce, { gender });

          expect(getContentMock).toHaveBeenCalledTimes(2);
          expect(getContentMock).toHaveBeenCalledWith({
            ...commonContent,
            isDivorce,
            language: lang,
            formState: req.session.userCase,
          });
          expect(res.render).toBeCalledWith('page', {
            ...defaultViewArgs,
            ...commonContent,
            isDivorce,
            formState: req.session.userCase,
            language: lang,
            pageText: `something in ${lang}`,
          });
        });
      });
    });
  });
});
