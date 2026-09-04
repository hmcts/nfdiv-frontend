import axios from 'axios';
import config from 'config';

jest.retryTimes(20);
jest.setTimeout(5000);

const idamWebUrl = config.has('services.idam.webBaseUrl')
  ? `${config.get('services.idam.webBaseUrl') as string}/health`
  : new URL('/health', config.get('services.idam.authorizationURL') as string).toString();

const idamApiUrl = config.has('services.idam.apiBaseUrl')
  ? `${config.get('services.idam.apiBaseUrl') as string}/health`
  : new URL('/health', config.get('services.idam.tokenURL') as string).toString();

const servicesToCheck = [
  { name: 'No Fault Divorce Web', url: process.env.TEST_URL },
  { name: 'IDAM Web', url: idamWebUrl },
  { name: 'IDAM API', url: idamApiUrl },
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
      const loginMarkers = ['Sign in or create an account', 'Sign in'];
      const hasExpectedLoginContent = loginMarkers.some(marker => response.data.includes(marker));

      if (response.status !== 200 || !hasExpectedLoginContent) {
        throw new Error(`Status: ${response.status} Data: '${JSON.stringify(response.data)}'`);
      }
    };
    await expect(checkHomepage()).resolves.not.toThrow();
  });
});
