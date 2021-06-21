import Axios, { AxiosStatic } from 'axios';

import { UserRole } from '../../case/definition';

import { getCaseWorkerUser, getRedirectUrl, getUserDetails } from './oidc';

jest.mock('axios');

const mockedAxios = Axios as jest.Mocked<AxiosStatic>;

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMjMiLCJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZXMiOlsiY2l0aXplbiJdLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9yaWFuIn0.PnrLdEsVEKBqoZvy65agBtoT3Gp-mqoYzczI27tpOO0';

describe('getRedirectUrl', () => {
  test('should create a valid URL to redirect to the login screen', () => {
    expect(getRedirectUrl('http://localhost')).toBe(
      'https://idam-web-public.aat.platform.hmcts.net/login?client_id=divorce&response_type=code&redirect_uri=http://localhost/oauth2/callback'
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

    const result = await getUserDetails('http://localhost', '123');
    expect(result).toStrictEqual({
      accessToken: token,
      email: 'test@test.com',
      roles: [UserRole.CITIZEN],
      givenName: 'John',
      familyName: 'Dorian',
      id: '123',
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

    const result = await getCaseWorkerUser();
    expect(result).toStrictEqual({
      accessToken: token,
      email: 'test@test.com',
      roles: [UserRole.CITIZEN],
      givenName: 'John',
      familyName: 'Dorian',
      id: '123',
    });
  });
});
