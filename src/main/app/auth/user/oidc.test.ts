import Axios, { AxiosStatic } from 'axios';
import type { LoggerInstance } from 'winston';

import { CaseApi } from '../../case/CaseApi';

import { getCaseApi, getRedirectUrl, getUserDetails } from './oidc';

jest.mock('axios');

const mockedAxios = Axios as jest.Mocked<AxiosStatic>;

describe('getRedirectUrl', () => {
  test('should create a valid URL to redirect to the login screen', () => {
    expect(getRedirectUrl('http://localhost')).toBe(
      'https://idam-web-public.aat.platform.hmcts.net/login?client_id=divorce&response_type=code&redirect_uri=http://localhost/oauth2/callback'
    );
  });
});

describe('getUserDetails', () => {
  test('should exchange a code for a token and decode a JWT to get the user details', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIn0.Rxb9hi3u67L4djtxLsPMZyg-_UhO-1apsmcYJIRL4ow';

    mockedAxios.post.mockResolvedValue({
      data: {
        access_token: token,
        id_token: token,
      },
    });

    const result = await getUserDetails('http://localhost', '123');
    expect(result).toStrictEqual({
      accessToken: token,
      jwt: {
        sub: 'test@test.com',
      },
    });
  });
});

describe('getCaseApi', () => {
  test('should create a CaseApi', () => {
    expect(getCaseApi('token', ({} as unknown) as LoggerInstance)).toBeInstanceOf(CaseApi);
  });
});
