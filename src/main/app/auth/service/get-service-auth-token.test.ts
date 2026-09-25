import { jest } from '@jest/globals';

jest.unstable_mockModule('axios', () => jest.createMockFromModule('axios'));
jest.unstable_mockModule('@hmcts/nodejs-logging', () => jest.createMockFromModule('@hmcts/nodejs-logging'));
jest.useFakeTimers({ legacyFakeTimers: true });

const { Logger } = await import('@hmcts/nodejs-logging');
const { default: axios } = await import('axios');
type AxiosStatic = import('axios').AxiosStatic;
const logger = {
  info: jest.fn(),
  error: jest.fn(),
};
Logger.getLogger.mockReturnValue(logger);

const { getServiceAuthToken, initAuthToken } = await import('./get-service-auth-token.js');

const mockedAxios = axios as jest.Mocked<AxiosStatic>;

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
    return new Promise<void>(resolve => {
      setImmediate(() => {
        expect(logger.error).toHaveBeenCalledWith(500, 'Error');
        resolve();
      });
    });
  });
});

describe('getServiceAuthToken', () => {
  test('Should return a token', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'token' });

    initAuthToken();

    return new Promise<void>(resolve => {
      setImmediate(() => {
        expect(getServiceAuthToken()).not.toBeUndefined();
        resolve();
      });
    });
  });
});
