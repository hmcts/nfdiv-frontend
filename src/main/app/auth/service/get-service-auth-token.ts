import { Logger } from '@hmcts/nodejs-logging';
import axios from 'axios';
import config from 'config';
import { TOTP } from 'otpauth';

const logger = Logger.getLogger('service-auth-token');
const processState = globalThis as typeof globalThis & {
  __nfdivServiceAuthToken?: string;
};

export const getTokenFromApi = (): void => {
  logger.info('Refreshing service auth token');

  const url: string = config.get('services.authProvider.url') + '/lease';
  const microservice: string = config.get('services.authProvider.microservice');
  const secret: string = config.get('services.authProvider.secret');
  const oneTimePassword = createOneTimePassword(secret);
  const body = { microservice, oneTimePassword };

  axios
    .post(url, body)
    .then(response => (processState.__nfdivServiceAuthToken = response.data))
    .catch(err => logger.error(err.response?.status, err.response?.data));
};

const createOneTimePassword = (secret: string): string => {
  const totp = new TOTP({
    secret,
    digits: 6,
    period: 30,
  });

  return totp.generate();
};

export const initAuthToken = (): void => {
  getTokenFromApi();
  setInterval(getTokenFromApi, 1000 * 60 * 60);
};

export const getServiceAuthToken = (): string => {
  return processState.__nfdivServiceAuthToken as string;
};
