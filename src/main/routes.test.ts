import { Application } from 'express';

import { Routes } from './routes';

describe('Routes', () => {
  it('sets up dynamic step sequence routes', () => {
    const appMock = ({
      get: jest.fn(),
      post: jest.fn(),
      use: jest.fn(),
      locals: {
        errorHandler: jest.fn(),
        container: {
          cradle: {
            homeGetController: { get: 'mock' },
            saveSignOutGetController: { get: 'mock' },
            privacyPolicyGetController: { get: 'mock' },
            termsAndConditionsGetController: { get: 'mock' },
            cookiesGetController: { get: 'mock' },
            accessibilityStatementGetController: { get: 'mock' },
            summaryGetController: { get: 'mock' },
            errorController: { get: 'mock' },
          },
        },
      },
    } as unknown) as Application;

    new Routes().enableFor(appMock);

    expect(appMock.locals.errorHandler).toHaveBeenCalled();

    expect(appMock.get).toHaveBeenCalledWith('/', undefined);
    expect(appMock.get).toHaveBeenCalledWith('/terms-and-conditions', undefined);
    expect(appMock.get).toHaveBeenCalledWith('/your-details', undefined);

    expect(appMock.use).toHaveBeenCalled();
  });
});
