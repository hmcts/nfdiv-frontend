import { Logger } from '@hmcts/nodejs-logging';
import Axios, { AxiosResponse } from 'axios';
import config from 'config';
import jwt_decode from 'jwt-decode';
import NodeCache from 'node-cache';

import { APPLICANT_2_CALLBACK_URL, CALLBACK_URL, PageLink, SIGN_IN_URL } from '../../../steps/urls';
import { UserDetails } from '../../controller/AppRequest';

const logger = Logger.getLogger('oidc');

const idamTokenCache = new NodeCache({ stdTTL: 3600, checkperiod: 1800 });

export const getRedirectUrl = (serviceUrl: string, requestPath: string): string => {
  const id: string = config.get('services.idam.clientID');
  const loginUrl: string = config.get('services.idam.authorizationURL');
  const callbackUrl = encodeURI(serviceUrl + (requestPath === SIGN_IN_URL ? CALLBACK_URL : APPLICANT_2_CALLBACK_URL));

  return `${loginUrl}?client_id=${id}&response_type=code&redirect_uri=${callbackUrl}`;
};

export const getUserDetails = async (
  serviceUrl: string,
  rawCode: string,
  callbackUrlPageLink: PageLink
): Promise<UserDetails> => {
  const id: string = config.get('services.idam.clientID');
  const secret: string = config.get('services.idam.clientSecret');
  const tokenUrl: string = config.get('services.idam.tokenURL');
  const callbackUrl = encodeURI(serviceUrl + callbackUrlPageLink);
  const code = encodeURIComponent(rawCode);
  const data = `client_id=${id}&client_secret=${secret}&grant_type=authorization_code&redirect_uri=${callbackUrl}&code=${code}`;
  const headers = { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' };
  const response: AxiosResponse<OidcResponse> = await Axios.post(tokenUrl, data, { headers });
  const jwt = jwt_decode(response.data.id_token) as IdTokenJwtPayload;

  return {
    accessToken: response.data.access_token,
    id: jwt.uid,
    email: jwt.sub,
    givenName: jwt.given_name,
    familyName: jwt.family_name,
    roles: jwt.roles,
  };
};

export const getSystemUser = async (): Promise<UserDetails> => {
  const systemUsername: string = config.get('services.idam.systemUsername');
  const systemPassword: string = config.get('services.idam.systemPassword');

  let response;
  const isCachingEnabled = Boolean(config.get('services.idam.caching'));
  if (isCachingEnabled && idamTokenCache.get(systemUsername)) {
    response = idamTokenCache.get(systemUsername);
  } else if (isCachingEnabled) {
    logger.info('Generating access token for system user and then caching it');
    response = await getAccessTokenFromIdam(systemUsername, systemPassword);
    idamTokenCache.set(systemUsername, {
      data: { id_token: response.data.id_token, access_token: response.data.access_token },
    });
  } else {
    response = await getAccessTokenFromIdam(systemUsername, systemPassword);
  }

  const jwt = jwt_decode(response.data.id_token) as IdTokenJwtPayload;

  return {
    accessToken: response.data.access_token,
    id: jwt.uid,
    email: jwt.sub,
    givenName: jwt.given_name,
    familyName: jwt.family_name,
    roles: jwt.roles,
  };
};

interface IdTokenJwtPayload {
  uid: string;
  sub: string;
  given_name: string;
  family_name: string;
  roles: string[];
}

export interface OidcResponse {
  id_token: string;
  access_token: string;
}

export const getAccessTokenFromIdam = (username: string, password: string): Promise<AxiosResponse<OidcResponse>> => {
  const id: string = config.get('services.idam.clientID');
  const secret: string = config.get('services.idam.clientSecret');
  const tokenUrl: string = config.get('services.idam.tokenURL');
  const headers = { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' };
  const data = `grant_type=password&username=${username}&password=${password}&client_id=${id}&client_secret=${secret}&scope=openid%20profile%20roles%20openid%20roles%20profile`;

  return Axios.post(tokenUrl, data, { headers });
};
