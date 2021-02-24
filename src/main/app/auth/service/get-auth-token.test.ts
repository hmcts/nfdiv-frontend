jest.mock('axios');
jest.mock('@hmcts/nodejs-logging');
jest.useFakeTimers();

import { Logger } from '@hmcts/nodejs-logging';
import Axios, { AxiosStatic } from 'axios';
const logger = {
  info: jest.fn(),
  error: jest.fn(),
};
Logger.getLogger.mockReturnValue(logger);

import { getAuthToken, initAuthToken } from './get-auth-token';

const mockedAxios = Axios as jest.Mocked<AxiosStatic>;

describe('initAuthToken', () => {
  test('Should set an interval to start fetching a token', () => {
    mockedAxios.post.mockResolvedValue('token');

    initAuthToken();
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/lease',
      {
        microservice: 'divorce_frontend',
        oneTimePassword: expect.anything(),
      }
    );
  });

  test('Should log errors', () => {
    mockedAxios.post.mockRejectedValue({ response: { status: 500, data: 'Error' } });

    initAuthToken();

    setImmediate(() => {
      expect(logger.error).toHaveBeenCalledWith(500, 'Error');
    });
  });
});

describe('getAuthToken', () => {
  test('Should return a token', () => {
    mockedAxios.post.mockResolvedValue({ data: 'token' });

    initAuthToken();

    setImmediate(() => {
      expect(getAuthToken()).not.toBeUndefined();
    });
  });
});
