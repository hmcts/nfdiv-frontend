import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { commonContent } from '../../steps/common/common.content';
import { CaseType, Gender } from '../case/case';

import { GetController, Translations } from './GetController';

describe('GetController', () => {
  test('Should render the page', async () => {
    const controller = new GetController('page', ({ en: { extraEnglish: 'text' } } as unknown) as Translations);

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('page', {
      ...defaultViewArgs,
      extraEnglish: 'text',
      formState: req.session.userCase,
    });
  });

  test('Should render the page in Welsh', async () => {
    const controller = new GetController('page', ({ cy: { extraWelsh: 'text' } } as unknown) as Translations);

    const req = mockRequest();
    const res = mockResponse();
    req.session.lang = 'cy';
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('page', {
      ...defaultViewArgs,
      ...commonContent.cy,
      extraWelsh: 'text',
      formState: req.session.userCase,
    });
  });

  test("Doesn't call render if an error page has already been rendered upstream", async () => {
    const controller = new GetController('page', {} as Translations);

    const req = mockRequest();
    const res = mockResponse();
    res.locals.isError = true;
    await controller.get(req, res);

    expect(res.render).not.toHaveBeenCalled();
  });

  test("Doesn't call render if headers have already been sent already upstream", async () => {
    const controller = new GetController('page', {} as Translations);

    const req = mockRequest();
    const res = mockResponse();
    res.headersSent = true;
    await controller.get(req, res);

    expect(res.render).not.toHaveBeenCalled();
  });

  test('sends the current page form session state to the view', async () => {
    const controller = new GetController('page', {} as Translations);

    const req = mockRequest();
    const res = mockResponse();
    req.session.userCase.gender = Gender.Female;
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('page', {
      ...defaultViewArgs,
      formState: {
        id: '1234',
        divorceOrDissolution: 'divorce',
        gender: Gender.Female,
      },
    });
  });

  describe('getContent()', () => {
    test('calls getContent with correct arguments for new sessions', async () => {
      const getContentMock = jest.fn().mockReturnValue({});
      const controller = new GetController('page', getContentMock);

      const req = mockRequest();
      const res = mockResponse();
      await controller.get(req, res);

      expect(getContentMock).toHaveBeenCalledTimes(1);
      expect(getContentMock).toHaveBeenCalledWith({
        isDivorce: true,
        partner: 'partner',
      });
      expect(res.render).toBeCalledWith('page', {
        ...defaultViewArgs,
        formState: req.session.userCase,
      });
    });

    describe.each([
      { serviceType: CaseType.Divorce, isDivorce: true },
      { serviceType: CaseType.Dissolution, isDivorce: false, civilKey: 'civilPartner' },
    ])('Service type %s', ({ serviceType, isDivorce, civilKey }) => {
      describe.each(['en', 'cy'])('Language %s', lang => {
        test.each([
          { gender: Gender.Male, partnerKey: 'husband' },
          { gender: Gender.Female, partnerKey: 'wife' },
          { partnerKey: 'partner' },
        ])('calls getContent with correct arguments %s selected', async ({ gender, partnerKey }) => {
          const getContentMock = jest.fn().mockReturnValue({ [lang]: { pageText: `something in ${lang}` } });
          const controller = new GetController('page', getContentMock);

          const req = mockRequest({ session: { lang, userCase: { gender } } });
          const res = mockResponse({ locals: { serviceType } });
          await controller.get(req, res);

          expect(getContentMock).toHaveBeenCalledTimes(1);
          const expectedPartner = commonContent[lang][civilKey || partnerKey];
          expect(getContentMock).toHaveBeenCalledWith({
            isDivorce,
            partner: expectedPartner,
          });
          expect(res.render).toBeCalledWith('page', {
            ...defaultViewArgs,
            ...commonContent[lang],
            isDivorce,
            partner: expectedPartner,
            formState: req.session.userCase,
            language: lang,
            pageText: `something in ${lang}`,
          });
        });
      });
    });
  });
});
