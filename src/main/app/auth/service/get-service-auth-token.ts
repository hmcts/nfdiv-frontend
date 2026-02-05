import { Logger } from '@hmcts/nodejs-logging';
import axios from 'axios';
import config from 'config';
import OTPAuth from 'otpauth';

const logger = Logger.getLogger('service-auth-token');
let token;

export const getTokenFromApi = (): void => {
  logger.info('Refreshing service auth token');

  const url: string = config.get('services.authProvider.url') + '/lease';
  const microservice: string = config.get('services.authProvider.microservice');
  const secret: string = config.get('services.authProvider.secret');
  const oneTimePassword = createOneTimePassword(secret);
  const body = { microservice, oneTimePassword };

  axios
    .post(url, body)
    .then(response => (token = response.data))
    .catch(err => logger.error(err.response?.status, err.response?.data));
};

const createOneTimePassword = (secret: string): string => {
  const totp = new OTPAuth.TOTP({
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
  return token;
};
