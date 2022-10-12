import { Application } from 'express';

import { Routes } from './routes';
import {
  APPLICANT_2,
  ENTER_YOUR_ACCESS_CODE,
  EXIT_SERVICE,
  HOME_URL,
  RESPONDENT,
  TERMS_AND_CONDITIONS_URL,
  YOUR_DETAILS_URL,
} from './steps/urls';

describe('Routes', () => {
  it('sets up dynamic step sequence routes', () => {
    const appMock = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      use: jest.fn(),
      locals: {
        errorHandler: jest.fn(),
      },
    } as unknown as Application;

    new Routes().enableFor(appMock);

    expect(appMock.locals.errorHandler).toHaveBeenCalled();

    expect(appMock.get).toHaveBeenCalledWith(HOME_URL, undefined);
    expect(appMock.get).toHaveBeenCalledWith(
      [APPLICANT_2, RESPONDENT, `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`],
      undefined
    );
    expect(appMock.get).toHaveBeenCalledWith(EXIT_SERVICE, undefined);
    expect(appMock.get).toHaveBeenCalledWith(TERMS_AND_CONDITIONS_URL, undefined);
    expect(appMock.get).toHaveBeenCalledWith(YOUR_DETAILS_URL, expect.any(Function), undefined);
    expect(appMock.get).toHaveBeenCalledWith('/document-manager/delete/:index', undefined);

    expect(appMock.use).toHaveBeenCalled();
  });
});
