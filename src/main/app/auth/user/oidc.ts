import Axios from 'axios';
import config from 'config';
import jwt_decode from 'jwt-decode';
import type { LoggerInstance } from 'winston';

import { PageLink } from '../../../steps/urls';
import { CaseApi } from '../../case/CaseApi';
import { UserDetails } from '../../controller/AppRequest';

export const CALLBACK_URL: PageLink = '/oauth2/callback';

export const getRedirectUrl = (serviceUrl: string): string => {
  const id: string = config.get('services.idam.clientID');
  const loginUrl: string = config.get('services.idam.authorizationURL');
  const callbackUrl = encodeURI(serviceUrl + CALLBACK_URL);

  return `${loginUrl}?client_id=${id}&response_type=code&redirect_uri=${callbackUrl}`;
};

export const getUserDetails = async (serviceUrl: string, rawCode: string): Promise<UserDetails> => {
  const id: string = config.get('services.idam.clientID');
  const secret: string = config.get('services.idam.clientSecret');
  const tokenUrl: string = config.get('services.idam.tokenURL');
  const redirectUri = getRedirectUrl(serviceUrl);
  const code = encodeURIComponent(rawCode);
  const data = `client_id=${id}&client_secret=${secret}&grant_type=authorization_code&redirect_uri=${redirectUri}&code=${code}`;
  const headers = { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' };
  const response = await Axios.post(tokenUrl, data, { headers });

  return {
    accessToken: response.data.access_token,
    jwt: jwt_decode(response.data.id_token),
  };
};

export const getCaseApi = (accessToken: string, logger: LoggerInstance): CaseApi => {
  return new CaseApi(
    Axios.create({
      baseURL: config.get('services.cos.baseURL'),
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }),
    logger
  );
};
