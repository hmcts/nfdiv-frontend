import Axios, { AxiosStatic } from 'axios';

import { IdamUserManager, idamTokenCache } from '../../../../test/steps/IdamUserManager';
import { APPLICANT_2_SIGN_IN_URL, CALLBACK_URL, SIGN_IN_URL } from '../../../steps/urls';

import { getRedirectUrl, getSystemUser, getUserDetails } from './oidc';

jest.mock('axios');
jest.mock('node-cache');

const getAccessTokenFromIdamMock = jest.spyOn(IdamUserManager, 'getAccessTokenFromIdam');
const idamCacheGetMock = jest.spyOn(idamTokenCache, 'get');

const mockedAxios = Axios as jest.Mocked<AxiosStatic>;

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZ2l2ZW5fbmFtZSI6IkpvaG4iLCJmYW1pbHlfbmFtZSI6IkRvcmlhbiIsInVpZCI6IjEyMyIsInJvbGVzIjpbImNpdGl6ZW4iXX0.rxjx6XsSNNYavVppwKAqWiNWT_GxN4vjVzdLRe6q14I';

describe('getRedirectUrl', () => {
  test('should create a valid URL to redirect to the login screen', () => {
    expect(getRedirectUrl('http://localhost', SIGN_IN_URL)).toBe(
      'https://idam-web-public.aat.platform.hmcts.net/login?client_id=divorce&response_type=code&redirect_uri=http://localhost/oauth2/callback'
    );
  });

  test('should create a valid URL to redirect to applicant2 login screen', () => {
    expect(getRedirectUrl('http://localhost', APPLICANT_2_SIGN_IN_URL)).toBe(
      'https://idam-web-public.aat.platform.hmcts.net/login?client_id=divorce&response_type=code&redirect_uri=http://localhost/oauth2/callback-applicant2'
    );
  });
});

describe('getUserDetails', () => {
  test('should exchange a code for a token and decode a JWT to get the user details', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        access_token: token,
        id_token: token,
      },
    });

    const result = await getUserDetails('http://localhost', '123', CALLBACK_URL);
    expect(result).toStrictEqual({
      accessToken: token,
      email: 'test@test.com',
      givenName: 'John',
      familyName: 'Dorian',
      id: '123',
      roles: ['citizen'],
    });
  });
});

describe('getCaseWorkerUser', () => {
  test('should retrieve a token with caseworker username and password then decode the JWT to get user details', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        access_token: token,
        id_token: token,
      },
    });

    const result = await getSystemUser();
    expect(result).toStrictEqual({
      accessToken: token,
      email: 'test@test.com',
      givenName: 'John',
      familyName: 'Dorian',
      id: '123',
      roles: ['citizen'],
    });
  });
});

token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZ2l2ZW5fbmFtZSI6IkpvaG4iLCJmYW1pbHlfbmFtZSI6IkRvcmlhbiIsInVpZCI6IjEyMyIsInJvbGVzIjpbImNhc2V3b3JrZXItZGl2b3JjZS1zeXN0ZW11cGRhdGUiLCJjYXNld29ya2VyLWNhYSIsImNhc2V3b3JrZXIiLCJjYXNld29ya2VyLWRpdm9yY2UiXX0.NDab3XAV8NWQTuuxBQ9mpwTIdw4KMWWiJ37Dp3EHG7s';

describe('getSystemUser', () => {
  test('In non-production mode sets cache when user token has not been saved', async () => {
    process.env.NODE_ENV = 'development';
    (idamCacheGetMock as jest.Mock).mockReturnValue(undefined);
    getAccessTokenFromIdamMock.mockResolvedValue({
      status: 200,
      data: {
        id_token: token,
        access_token: token,
      },
      statusText: 'wsssw',
      headers: { test: 'now' },
      config: {},
    });

    const expected = await getSystemUser();
    expect(expected).toEqual({
      accessToken: token,
      email: 'test@test.com',
      givenName: 'John',
      familyName: 'Dorian',
      id: '123',
      roles: ['caseworker-divorce-systemupdate', 'caseworker-caa', 'caseworker', 'caseworker-divorce'],
    });
    expect(idamTokenCache.get).toHaveBeenCalledWith('dummy_user');
    expect(idamTokenCache.get).toHaveBeenCalledTimes(1);

    expect(idamTokenCache.set).toHaveBeenCalledWith('dummy_user', { data: { access_token: token, id_token: token } });
    expect(idamTokenCache.set).toHaveBeenCalledTimes(1);
  });

  test('In non-production mode uses cache when user token has already been saved', async () => {
    process.env.NODE_ENV = 'development';
    (idamCacheGetMock as jest.Mock).mockReturnValue({
      data: {
        id_token: token,
        access_token: token,
      },
    });

    const expected = await getSystemUser();
    expect(expected).toEqual({
      accessToken: token,
      email: 'test@test.com',
      givenName: 'John',
      familyName: 'Dorian',
      id: '123',
      roles: ['caseworker-divorce-systemupdate', 'caseworker-caa', 'caseworker', 'caseworker-divorce'],
    });
    expect(idamTokenCache.get).toHaveBeenCalledWith('dummy_user');
    expect(idamTokenCache.get).toHaveBeenCalledTimes(2);
  });

  test('Creates a new token when in production mode', async () => {
    process.env.NODE_ENV = 'production';
    getAccessTokenFromIdamMock.mockResolvedValue({
      status: 200,
      data: {
        id_token: token,
        access_token: token,
      },
      statusText: 'wsssw',
      headers: { test: 'now' },
      config: {},
    });

    const expected = await getSystemUser();
    expect(expected).toEqual({
      accessToken: token,
      email: 'test@test.com',
      givenName: 'John',
      familyName: 'Dorian',
      id: '123',
      roles: ['caseworker-divorce-systemupdate', 'caseworker-caa', 'caseworker', 'caseworker-divorce'],
    });
    expect(idamTokenCache.get).toHaveBeenCalledTimes(1);
    expect(idamTokenCache.set).toHaveBeenCalledTimes(0);
  });
});
