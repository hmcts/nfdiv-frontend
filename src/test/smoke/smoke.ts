import axios from 'axios';

import { config } from '../config';

jest.retryTimes(20); // 20 retries at 3 second intervals = 1 minute
jest.setTimeout(15000);

describe('Smoke Test', () => {
  describe('Health Check', () => {
    test('should return status 200', async () => {
      let response = { status: 0 };
      try {
        response = await axios.get(`${config.TEST_URL}/health`);
      } catch (e) {
        response.status = e;
      }

      if (response.status !== 200) {
        await new Promise((resolve, reject) =>
          setTimeout(() => reject(`App health endpoint did not return a 200 OK response: ${response.status}`), 3000)
        );
      }

      expect(response.status).toBe(200);
    });
  });
});
