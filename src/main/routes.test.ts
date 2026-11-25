import { Application } from 'express';
import { vi } from 'vitest';

import { Routes } from './routes.js';
import {
  APPLICANT_2,
  ENTER_YOUR_ACCESS_CODE,
  EXIT_SERVICE,
  HOME_URL,
  RESPONDENT,
  TERMS_AND_CONDITIONS_URL,
  YOUR_DETAILS_URL,
} from './steps/urls.js';

describe('Routes', () => {
  it('sets up dynamic step sequence routes', async () => {
    const appMock = {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
      use: vi.fn(),
      locals: {
        errorHandler: vi.fn(),
      },
    } as unknown as Application;

    await new Routes().enableFor(appMock);

    expect(appMock.locals.errorHandler).toHaveBeenCalled();

    expect(appMock.get).toHaveBeenCalledWith(HOME_URL, undefined);
    expect(appMock.get).toHaveBeenCalledWith(
      [APPLICANT_2, RESPONDENT, `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`],
      undefined
    );
    expect(appMock.get).toHaveBeenCalledWith(EXIT_SERVICE, undefined);
    expect(appMock.get).toHaveBeenCalledWith(TERMS_AND_CONDITIONS_URL, undefined);
    expect(appMock.get).toHaveBeenCalledWith(YOUR_DETAILS_URL, expect.any(Function), undefined);
    expect(appMock.post).toHaveBeenCalledWith('/document-manager/delete/:index', undefined);

    expect(appMock.use).toHaveBeenCalled();
  });
});
