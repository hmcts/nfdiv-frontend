import axios from 'axios';
import config from 'config';

jest.retryTimes(20);
jest.setTimeout(5000);

const servicesToCheck = [
  { name: 'No Fault Divorce Web', url: process.env.TEST_URL },
  { name: 'IDAM Web', url: config.get('services.idam.authorizationURL') },
  { name: 'IDAM API', url: config.get('services.idam.tokenURL') },
  { name: 'Auth Provider', url: config.get('services.authProvider.url') },
  { name: 'CCD Data Store', url: config.get('services.case.url') },
  { name: 'Payment API', url: config.get('services.payments.url') },
];

const checkService = async (url: string) => {
  const response = await axios.get(url);
  if (response.status !== 200 || response.data?.status !== 'UP') {
    throw new Error(`Status: ${response.status} Data: '${JSON.stringify(response.data)}'`);
  }
};

describe.each(servicesToCheck)('Required services should return 200 status UP', ({ name, url }) => {
  const parsedUrl = new URL('/health', url as string).toString();

  test(`${name}: ${parsedUrl}`, async () => {
    await expect(checkService(parsedUrl)).resolves.not.toThrow();
  });
});

describe('Homepage should redirect to IDAM', () => {
  test('Homepage', async () => {
    const checkHomepage = async () => {
      const response = await axios.get(process.env.TEST_URL as string);
      if (response.status !== 200 || !response.data.includes('password')) {
        throw new Error(`Status: ${response.status} Data: '${JSON.stringify(response.data)}'`);
      }
    };
    await expect(checkHomepage()).resolves.not.toThrow();
  });
});
