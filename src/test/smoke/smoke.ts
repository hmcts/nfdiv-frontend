import axios from 'axios';
import config from 'config';

import { config as testConfig } from '../config';

jest.retryTimes(20); // 20 retries at 1 second intervals
jest.setTimeout(15000);

const servicesToCheck = [
  { name: 'No Fault Divorce Web', url: testConfig.TEST_URL },
  { name: 'IDAM Web', url: config.get('services.idam.authorizationURL') },
  { name: 'IDAM API', url: config.get('services.idam.tokenURL') },
  { name: 'Auth Provider', url: config.get('services.authProvider.url') },
  { name: 'CCD Data Store', url: config.get('services.case.url') },
];

describe('Smoke Test', () => {
  describe('Health Check', () => {
    describe.each(servicesToCheck)('Required services should return 200 status UP', ({ name, url }) => {
      const parsedUrl = new URL('/health', url as string).toString();

      test(`${name}: ${parsedUrl}`, async () => {
        const checkService = async () => {
          try {
            const response = await axios.get(parsedUrl, {
              headers: {
                'Accept-Encoding': 'gzip',
                accept: 'application/json',
              },
            });
            if (response.status !== 200 || response.data?.status !== 'UP') {
              throw new Error(`Status: ${response.status} Data: '${JSON.stringify(response.data)}'`);
            }
          } catch (e) {
            await new Promise((resolve, reject) =>
              setTimeout(() => reject(`'${name}' endpoint is not up: '${parsedUrl}': ${e}`), 1000)
            );
          }
        };

        await expect(checkService()).resolves.not.toThrow();
      });
    });
  });
});
