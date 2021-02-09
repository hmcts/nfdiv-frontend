import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { commonContent } from '../../steps/common/common.content';

import { GetController, Translations } from './GetController';

describe('GetController', () => {
  test('Should render the home page', async () => {
    const controller = new GetController('home/home', {} as Translations);

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);

    expect(res.render).toBeCalledWith('home/home', { ...commonContent.en, sessionErrors: [] });
  });

  test("Doesn't call render if an error page has already been rendered upstream", async () => {
    const controller = new GetController('home/home', {} as Translations);

    const req = mockRequest();
    const res = mockResponse();
    res.locals.isError = true;
    await controller.get(req, res);

    expect(res.render).not.toHaveBeenCalled();
  });

  test('calls getContent with correct arguments when serviceType is civil', async () => {
    const getContentMock = jest.fn().mockReturnValue({ en: { additionalEnglish: 'text' } });
    const controller = new GetController('home/home', getContentMock);

    const req = mockRequest();
    const res = mockResponse();
    res.locals.serviceType = 'civil';
    await controller.get(req, res);

    expect(getContentMock).toHaveBeenCalledTimes(1);
    expect(getContentMock).toHaveBeenCalledWith(false);
    expect(res.render).toBeCalledWith('home/home', {
      ...commonContent.en,
      additionalEnglish: 'text',
      sessionErrors: [],
    });
  });

  test('returns Welsh translations', async () => {
    const getContentMock = jest.fn().mockReturnValue({ cy: { additionalWelsh: 'text' } });
    const controller = new GetController('home/home', getContentMock);

    const req = mockRequest();
    const res = mockResponse();
    req.session.lang = 'cy';
    await controller.get(req, res);

    expect(getContentMock).toHaveBeenCalledTimes(1);
    expect(getContentMock).toHaveBeenCalledWith(true);
    expect(res.render).toBeCalledWith('home/home', { ...commonContent.cy, additionalWelsh: 'text', sessionErrors: [] });
  });
});
