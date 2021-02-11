import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { commonContent } from '../../steps/common/common.content';

import { GetController, Translations } from './GetController';

describe('GetController', () => {
  test('Should render the page', async () => {
    const controller = new GetController('page', ({ en: { extraEnglish: 'text' } } as unknown) as Translations);

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('page', { ...commonContent.en, extraEnglish: 'text', sessionErrors: [] });
  });

  test('Should render the page in Welsh', async () => {
    const controller = new GetController('page', ({ cy: { extraWelsh: 'text' } } as unknown) as Translations);

    const req = mockRequest();
    const res = mockResponse();
    req.session.lang = 'cy';
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('page', { ...commonContent.cy, extraWelsh: 'text', sessionErrors: [] });
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
    const controller = new GetController('page', {} as Translations, 'test-page');

    const req = mockRequest();
    const res = mockResponse();
    req.session.state['test-page'] = { someInputData: 'falafel' };
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('page', {
      ...commonContent.en,
      sessionErrors: [],
      formState: {
        someInputData: 'falafel',
      },
    });
  });

  describe('Service type divorce', () => {
    test('calls getContent with correct arguments in English', async () => {
      const getContentMock = jest.fn().mockReturnValue({ en: { additionalEnglish: 'text' } });
      const controller = new GetController('page', getContentMock);

      const req = mockRequest();
      const res = mockResponse();
      await controller.get(req, res);

      expect(getContentMock).toHaveBeenCalledTimes(1);
      expect(getContentMock).toHaveBeenCalledWith(true);
      expect(res.render).toBeCalledWith('page', {
        ...commonContent.en,
        additionalEnglish: 'text',
        sessionErrors: [],
      });
    });

    test('calls getContent with correct arguments in Welsh', async () => {
      const getContentMock = jest.fn().mockReturnValue({ cy: { additionalWelsh: 'text' } });
      const controller = new GetController('page', getContentMock);

      const req = mockRequest();
      const res = mockResponse();
      req.session.lang = 'cy';
      await controller.get(req, res);

      expect(getContentMock).toHaveBeenCalledTimes(1);
      expect(getContentMock).toHaveBeenCalledWith(true);
      expect(res.render).toBeCalledWith('page', {
        ...commonContent.cy,
        additionalWelsh: 'text',
        sessionErrors: [],
      });
    });
  });

  describe('Service type civil', () => {
    test('calls getContent with correct arguments in English', async () => {
      const getContentMock = jest.fn().mockReturnValue({ en: { additionalEnglish: 'text' } });
      const controller = new GetController('page', getContentMock);

      const req = mockRequest();
      const res = mockResponse();
      res.locals.serviceType = 'civil';
      await controller.get(req, res);

      expect(getContentMock).toHaveBeenCalledTimes(1);
      expect(getContentMock).toHaveBeenCalledWith(false);
      expect(res.render).toBeCalledWith('page', {
        ...commonContent.en,
        additionalEnglish: 'text',
        sessionErrors: [],
      });
    });

    test('calls getContent with correct arguments in Welsh', async () => {
      const getContentMock = jest.fn().mockReturnValue({ cy: { additionalWelsh: 'text' } });
      const controller = new GetController('page', getContentMock);

      const req = mockRequest();
      const res = mockResponse();
      res.locals.serviceType = 'civil';
      req.session.lang = 'cy';
      await controller.get(req, res);

      expect(getContentMock).toHaveBeenCalledTimes(1);
      expect(getContentMock).toHaveBeenCalledWith(false);
      expect(res.render).toBeCalledWith('page', {
        ...commonContent.cy,
        additionalWelsh: 'text',
        sessionErrors: [],
      });
    });
  });
});
