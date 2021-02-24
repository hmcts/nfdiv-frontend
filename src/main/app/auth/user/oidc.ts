import Axios from 'axios';
import config from 'config';
import jwt_decode from 'jwt-decode';
import type { LoggerInstance } from 'winston';

import { PageLink } from '../../../steps/urls';
import { CaseApi } from '../../case/CaseApi';
import { UserDetails } from '../../controller/AppRequest';
import { getAuthToken } from '../service/get-auth-token';

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
  const callbackUrl = encodeURI(serviceUrl + CALLBACK_URL);
  const code = encodeURIComponent(rawCode);
  const data = `client_id=${id}&client_secret=${secret}&grant_type=authorization_code&redirect_uri=${callbackUrl}&code=${code}`;
  const headers = { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' };
  const response = await Axios.post(tokenUrl, data, { headers });
  const jwt = jwt_decode(response.data.id_token) as IdTokenJwtPayload;

  return {
    accessToken: response.data.access_token,
    id: jwt.uid,
    email: jwt.sub,
    givenName: jwt.given_name,
    familyName: jwt.family_name,
  };
};

export const getCaseApi = (userDetails: UserDetails, logger: LoggerInstance): CaseApi => {
  return new CaseApi(
    Axios.create({
      baseURL: config.get('services.case.url'),
      headers: {
        Authorization: 'Bearer ' + userDetails.accessToken,
        ServiceAuthorization: getAuthToken(),
        experimental: 'true',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }),
    userDetails,
    logger
  );
};

interface IdTokenJwtPayload {
  uid: string;
  sub: string;
  given_name: string;
  family_name: string;
  roles: string[];
}
