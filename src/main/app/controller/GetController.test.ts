import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { commonContent } from '../../steps/common/common.content';
import { Gender } from '../api/CaseApi';

import { GetController, Translations } from './GetController';

describe('GetController', () => {
  test('Should render the page', async () => {
    const controller = new GetController('page', ({ en: { extraEnglish: 'text' } } as unknown) as Translations);

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('page', {
      ...commonContent.en,
      extraEnglish: 'text',
      formState: req.session.userCase,
      sessionErrors: [],
    });
  });

  test('Should render the page in Welsh', async () => {
    const controller = new GetController('page', ({ cy: { extraWelsh: 'text' } } as unknown) as Translations);

    const req = mockRequest();
    const res = mockResponse();
    req.session.lang = 'cy';
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('page', {
      ...commonContent.cy,
      extraWelsh: 'text',
      formState: req.session.userCase,
      sessionErrors: [],
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
    req.session.userCase!.D8InferredRespondentGender = Gender.Female;
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('page', {
      ...commonContent.en,
      sessionErrors: [],
      formState: {
        id: '1234',
        divorceOrDissolution: 'divorce',
        D8InferredRespondentGender: Gender.Female,
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
      expect(getContentMock).toHaveBeenCalledWith({ isDivorce: true, partner: 'partner' });
      expect(res.render).toBeCalledWith('page', {
        ...commonContent.en,
        sessionErrors: [],
        formState: req.session.userCase,
      });
    });

    describe.each([
      { serviceType: 'divorce', isDivorce: true },
      { serviceType: 'civil', isDivorce: false, civilKey: 'civilPartner' },
    ])('Service type %s', ({ serviceType, isDivorce, civilKey }) => {
      describe.each(['en', 'cy'])('Language %s', lang => {
        test.each([
          { D8InferredRespondentGender: Gender.Male, partnerKey: 'husband' },
          { D8InferredRespondentGender: Gender.Female, partnerKey: 'wife' },
          { partnerKey: 'partner' },
        ])(
          'calls getContent with correct arguments %s selected',
          async ({ D8InferredRespondentGender, partnerKey }) => {
            const getContentMock = jest.fn().mockReturnValue({ [lang]: { pageText: `something in ${lang}` } });
            const controller = new GetController('page', getContentMock);

            const req = mockRequest({ session: { lang, userCase: { D8InferredRespondentGender } } });
            const res = mockResponse({ locals: { serviceType } });
            await controller.get(req, res);

            expect(getContentMock).toHaveBeenCalledTimes(1);
            const expectedPartner = commonContent[lang][civilKey || partnerKey];
            expect(getContentMock).toHaveBeenCalledWith({ isDivorce, partner: expectedPartner });
            expect(res.render).toBeCalledWith('page', {
              ...commonContent[lang],
              pageText: `something in ${lang}`,
              sessionErrors: [],
              formState: req.session.userCase,
            });
          }
        );
      });
    });
  });
});
