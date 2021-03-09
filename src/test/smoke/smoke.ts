import axios from 'axios';

import { config } from '../config';

jest.retryTimes(20); // 20 retries at 1 second intervals
jest.setTimeout(15000);

const servicesToCheck = [
  { name: 'No Fault Divorce Web', url: config.TEST_URL },
  { name: 'IDAM Web', url: 'https://idam-web-public.aat.platform.hmcts.net' },
  { name: 'IDAM API', url: 'https://idam-api.aat.platform.hmcts.net' },
  { name: 'Auth Provider', url: 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal' },
  { name: 'CCD Data Store', url: 'http://ccd-data-store-api-aat.service.core-compute-aat.internal' },
];

describe('Smoke Test', () => {
  describe('Health Check', () => {
    test.each(servicesToCheck)('should return status 200 status: UP %o', async ({ name, url }) => {
      const checkService = async () => {
        try {
          const response = await axios.get(`${url}/health`);
          if (response.status !== 200 || response.data?.status !== 'UP') {
            throw new Error(`Status: ${response.status} Data: '${JSON.stringify(response.data)}'`);
          }
        } catch (e) {
          await new Promise((resolve, reject) =>
            setTimeout(() => reject(`'${name}' endpoint is not up: '${url}': ${e}`), 1000)
          );
        }
      };

      await expect(checkService()).resolves.not.toThrow();
    });
  });
});
