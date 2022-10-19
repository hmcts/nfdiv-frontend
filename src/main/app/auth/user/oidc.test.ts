import Axios, { AxiosStatic } from 'axios';

import { APPLICANT_2_SIGN_IN_URL, CALLBACK_URL, SIGN_IN_URL } from '../../../steps/urls';

import { getRedirectUrl, getSystemUser, getUserDetails } from './oidc';

jest.mock('axios');

const mockedAxios = Axios as jest.Mocked<AxiosStatic>;

const token =
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
