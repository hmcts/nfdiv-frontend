import { Application } from 'express';

import { Routes } from './routes';
import { Step, getSteps } from './steps/sequence';
import { generateContent } from './steps/sequence/your-details/content';

jest.mock('./steps/sequence');
jest.mock('./steps/sequence/your-details/content');

const getStepsMock = getSteps as jest.Mock<Step[]>;

describe('Routes', () => {
  it('sets up dynamic step sequence routes', () => {
    getStepsMock.mockReturnValue([{ id: 'your-details', title: 'Mock Title', url: '/mockUrl' } as Step]);

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
            termsAndConditionsGetController: { get: 'mock' },
            cookiesGetController: { get: 'mock' },
            accessibilityStatementGetController: { get: 'mock' },
            errorController: { get: 'mock' },
          },
        },
      },
    } as unknown) as Application;

    new Routes().enableFor(appMock);

    expect(appMock.locals.errorHandler).toHaveBeenCalled();

    expect(generateContent).toHaveBeenCalledWith('Mock Title');

    expect(appMock.get).toHaveBeenCalledWith('/', undefined);
    expect(appMock.get).toHaveBeenCalledWith('/terms-and-conditions', undefined);
    expect(appMock.get).toHaveBeenCalledWith('/mockUrl', undefined);

    expect(appMock.post).toHaveBeenCalledWith('/mockUrl', undefined);

    expect(appMock.use).toHaveBeenCalled();
  });
});
