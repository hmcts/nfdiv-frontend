import { Application } from 'express';

import { Routes } from './routes';
import { Step, getSteps } from './steps/sequence';

jest.mock('./steps/sequence');

const getStepsMock = getSteps as jest.Mock<Step[]>;

describe('Routes', () => {
  it('sets up dyamic step sequence routes', () => {
    getStepsMock.mockReturnValue([{ id: 'your-details', title: 'mockTitle', url: '/mockUrl' } as Step]);

    const appMock = ({
      get: jest.fn(),
      post: jest.fn(),
      use: jest.fn(),
      locals: {
        errorHandler: jest.fn(),
        container: {
          cradle: {
            homeGetController: { get: 'mock' },
            termsAndConditionsGetController: { get: 'mock' },
            errorController: { get: 'mock' },
          },
        },
      },
    } as unknown) as Application;

    new Routes().enableFor(appMock);

    expect(appMock.locals.errorHandler).toHaveBeenCalled();

    expect(appMock.get).toHaveBeenCalledWith('/', undefined);
    expect(appMock.get).toHaveBeenCalledWith('/terms-and-conditions', undefined);
    expect(appMock.get).toHaveBeenCalledWith('/mockUrl', undefined);

    expect(appMock.post).toHaveBeenCalledWith('/mockUrl', undefined);

    expect(appMock.use).toHaveBeenCalled();
  });
});
