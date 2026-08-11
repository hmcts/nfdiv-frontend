jest.mock('axios');
jest.mock('@hmcts/nodejs-logging');
jest.useFakeTimers({ legacyFakeTimers: true });

import { Logger } from '@hmcts/nodejs-logging';
import axios, { AxiosStatic } from 'axios';
const logger = {
  info: jest.fn(),
  error: jest.fn(),
};
Logger.getLogger.mockReturnValue(logger);

import { getServiceAuthToken, initAuthToken } from './get-service-auth-token.js';

const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe('initAuthToken', () => {
  test('Should fetch a token before starting the refresh interval', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'token' });

    await initAuthToken();
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/lease',
      {
        microservice: 'divorce_frontend',
        oneTimePassword: expect.anything(),
      }
    );
  });

  test('Should log errors and reject when the initial token cannot be fetched', async () => {
    mockedAxios.post.mockRejectedValue({ response: { status: 500, data: 'Error' } });

    await expect(initAuthToken()).rejects.toEqual({ response: { status: 500, data: 'Error' } });
    expect(logger.error).toHaveBeenCalledWith(500, 'Error');
  });
});

describe('getServiceAuthToken', () => {
  test('Should return a token', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'token' });

    await initAuthToken();
    expect(getServiceAuthToken()).toBe('token');
  });
});
