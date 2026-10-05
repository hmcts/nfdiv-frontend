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
    const frontendUrl = process.env.TEST_URL as string;
    const expectedIdamHost = new URL(config.get('services.idam.authorizationURL') as string).host;
    const redirectStatuses = [301, 302, 303, 307, 308];
    const first = await axios.get(frontendUrl, {
      maxRedirects: 0,
      validateStatus: (status: number) => redirectStatuses.includes(status),
    });

    const firstLocation = String(first.headers.location || '');
    expect(redirectStatuses).toContain(first.status);
    expect(firstLocation).toBeTruthy();
    const secondUrl = new URL(firstLocation, frontendUrl).toString();
    const second = await axios.get(secondUrl, {
      maxRedirects: 0,
      validateStatus: (status: number) => redirectStatuses.includes(status),
    });

    const secondLocation = String(second.headers.location || '');
    const secondRedirectUrl = new URL(secondLocation, secondUrl);
    expect(redirectStatuses).toContain(second.status);
    expect(secondRedirectUrl.host).toBe(expectedIdamHost);
    expect(secondRedirectUrl.pathname).toMatch(/^\/(o\/authorize|login)/i);
  });
});
