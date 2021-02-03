import axios from 'axios';

import { config } from '../config';

describe('Smoke Test', () => {
  describe('Health Check', () => {
    test('should return status 200', async () => {
      const response = await axios.get(`${config.TEST_URL}/health`);

      expect(response.status).toBe(200);
    });
  });
});
