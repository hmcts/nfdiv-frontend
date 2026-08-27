import { Logger } from '@hmcts/nodejs-logging';
import axios from 'axios';
import config from 'config';
import { TOTP } from 'otpauth';

const logger = Logger.getLogger('service-auth-token');
const processState = globalThis as typeof globalThis & {
  __nfdivServiceAuthToken?: string;
};
let tokenRefreshPromise: Promise<string> | undefined;
let refreshIntervalStarted = false;

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
  const totp = new TOTP({
    secret,
    digits: 6,
    period: 30,
  });

  return totp.generate();
};

export const initAuthToken = async (): Promise<void> => {
  const initialRefresh = refreshToken();

  if (!refreshIntervalStarted) {
    refreshIntervalStarted = true;
    setInterval(
      () => {
        void refreshToken().catch(() => undefined);
      },
      1000 * 60 * 60
    );
  }

  await initialRefresh;
};

const refreshToken = (): Promise<string> => {
  if (!tokenRefreshPromise) {
    const refresh = getTokenFromApi();
    tokenRefreshPromise = refresh;
    void refresh
      .finally(() => {
        if (tokenRefreshPromise === refresh) {
          tokenRefreshPromise = undefined;
        }
      })
      .catch(() => undefined);
  }
  return tokenRefreshPromise;
};

export const getServiceAuthToken = async (): Promise<string> => {
  if (processState.__nfdivServiceAuthToken) {
    return processState.__nfdivServiceAuthToken;
  }

  return refreshToken();
};
