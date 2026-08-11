import { Logger } from '@hmcts/nodejs-logging';
import axios from 'axios';
import config from 'config';
import * as OTPAuth from 'otpauth';

const logger = Logger.getLogger('service-auth-token');
const processState = globalThis as typeof globalThis & {
  __nfdivServiceAuthToken?: string;
};

export const getTokenFromApi = async (): Promise<string> => {
  logger.info('Refreshing service auth token');

  const url: string = config.get('services.authProvider.url') + '/lease';
  const microservice: string = config.get('services.authProvider.microservice');
  const secret: string = config.get('services.authProvider.secret');
  const oneTimePassword = createOneTimePassword(secret);
  const body = { microservice, oneTimePassword };

  try {
    const response = await axios.post(url, body);
    const serviceAuthToken = response.data as string;
    processState.__nfdivServiceAuthToken = serviceAuthToken;
    return serviceAuthToken;
  } catch (err) {
    logger.error(err.response?.status, err.response?.data);
    throw err;
  }
};

const createOneTimePassword = (secret: string): string => {
  const totp = new OTPAuth.TOTP({
    secret,
    digits: 6,
    period: 30,
  });

  return totp.generate();
};

export const initAuthToken = async (): Promise<void> => {
  await getTokenFromApi();
  setInterval(
    () => {
      void getTokenFromApi().catch(() => undefined);
    },
    1000 * 60 * 60
  );
};

export const getServiceAuthToken = (): string => {
  if (!processState.__nfdivServiceAuthToken) {
    throw new Error('Service auth token is not available');
  }
  return processState.__nfdivServiceAuthToken;
};
