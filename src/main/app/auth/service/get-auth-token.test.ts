import Axios, { AxiosStatic } from 'axios';

import { getAuthToken, initAuthToken } from './get-auth-token';

import anything = jasmine.anything;

jest.mock('axios');
jest.useFakeTimers();

const mockedAxios = Axios as jest.Mocked<AxiosStatic>;

describe('initAuthToken', () => {
  test('Should set an interval to start fetching a token', () => {
    mockedAxios.post.mockResolvedValue('token');

    initAuthToken();
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/lease',
      {
        microservice: 'divorce_frontend',
        oneTimePassword: anything(),
      }
    );
  });
});

describe('getAuthToken', () => {
  test('Return a token', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'token' });

    initAuthToken();

    return new Promise<void>(resolve => {
      setImmediate(() => {
        expect(getAuthToken()).not.toBeUndefined();
        resolve();
      });
    });
  });
});
