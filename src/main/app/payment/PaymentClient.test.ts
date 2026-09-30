/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from '@jest/globals';

import { mockRequest } from '../../../test/unit/utils/mockRequest.js';
import { DivorceOrDissolution, Fee, ListValue } from '../case/definition.js';

jest.unstable_mockModule('axios', () => jest.createMockFromModule('axios'));
jest.unstable_mockModule('config', () => ({ default: jest.createMockFromModule('config') }));
jest.unstable_mockModule('../auth/service/get-service-auth-token.js', () => ({ getServiceAuthToken: jest.fn() }));
jest.unstable_mockModule('@hmcts/nodejs-logging', () => ({
  Logger: { getLogger: jest.fn().mockReturnValue({ error: jest.fn(), info: jest.fn() }) },
}));
jest.unstable_mockModule('../../../test/unit/mocks/hmcts/nodejs-logging', () => ({
  Logger: { getLogger: jest.fn().mockReturnValue({ error: jest.fn(), info: jest.fn() }) },
}));

const { default: axios } = await import('axios');
const { default: config } = await import('config');
const { getServiceAuthToken } = await import('../auth/service/get-service-auth-token.js');
const { PaymentClient } = await import('./PaymentClient.js');
const { Logger } = await import('@hmcts/nodejs-logging');
const paymentLogger = (Logger.getLogger as unknown as jest.Mock<(...args: any[]) => any>).mock.results.at(-1)
  ?.value as {
  error: jest.Mock<(...args: any[]) => any>;
};
type AxiosInstance = import('axios').AxiosInstance;
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedConfig = config as jest.Mocked<typeof config>;
const mockGetServiceAuthToken = getServiceAuthToken as jest.Mocked<jest.Mock<(...args: any[]) => any>>;
const serviceRequestNumber = 'test123';

describe('PaymentClient', () => {
  it('creates payments', async () => {
    mockedConfig.get.mockReturnValueOnce('http://mock-service-url');
    mockedConfig.get.mockReturnValueOnce('mock-api-key');
    mockGetServiceAuthToken.mockReturnValueOnce('mock-server-auth-token');
    const mockPost = jest.fn() as jest.Mock<(...args: any[]) => any>;
    mockPost.mockResolvedValueOnce({
      data: { mockPayment: 'data', next_url: 'http://example.com/pay' },
    });
    mockedAxios.create.mockReturnValueOnce({ post: mockPost } as unknown as AxiosInstance);

    const orderSummaryFees: ListValue<Fee>[] = [
      {
        id: '1',
        value: {
          FeeAmount: '12345',
          FeeCode: 'mock code',
          FeeVersion: 'mock version',
          FeeDescription: 'mock description',
        },
      },
    ];
    const req = mockRequest({
      userCase: {
        id: '1234',
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        applicationFeeOrderSummary: {
          Fees: orderSummaryFees,
        },
      },
    });

    const client = new PaymentClient(req.session, 'http://return-url');
    const actual = await client.create(serviceRequestNumber, orderSummaryFees);

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'http://mock-service-url',
      headers: {
        Authorization: 'Bearer mock-user-access-token',
        ServiceAuthorization: 'mock-server-auth-token',
      },
    });

    expect(mockPost).toHaveBeenCalledWith(`/service-request/${serviceRequestNumber}/card-payments`, {
      amount: 123.45,
      currency: 'GBP',
      language: 'English',
      'return-url': 'http://return-url',
    });

    expect(actual).toEqual({
      mockPayment: 'data',
      next_url: 'http://example.com/pay',
    });
  });

  it('throws an error and logs if the response does not contain a redirect URL', async () => {
    mockedConfig.get.mockReturnValueOnce('http://mock-service-url');
    mockedConfig.get.mockReturnValueOnce('mock-api-key');
    mockGetServiceAuthToken.mockReturnValueOnce('mock-server-auth-token');
    const mockPost = jest.fn() as jest.Mock<(...args: any[]) => any>;
    mockPost.mockResolvedValueOnce({ data: { mockPayment: 'data, but missing _links' } });
    mockedAxios.create.mockReturnValueOnce({ post: mockPost } as unknown as AxiosInstance);
    const orderSummaryFees: ListValue<Fee>[] = [
      {
        id: '1',
        value: {
          FeeAmount: '12345',
          FeeCode: 'mock code',
          FeeVersion: 'mock version',
          FeeDescription: 'mock description',
        },
      },
    ];
    const req = mockRequest({
      userCase: {
        id: '1234',
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        applicationFeeOrderSummary: {
          Fees: orderSummaryFees,
        },
      },
    });

    const client = new PaymentClient(req.session, 'http://return-url');

    await expect(() => client.create(serviceRequestNumber, orderSummaryFees)).rejects.toThrow('Error creating payment');

    expect(paymentLogger.error).toHaveBeenCalledWith('Error creating payment', {
      mockPayment: 'data, but missing _links',
    });
  });

  it('gets payment data', async () => {
    const mockGet = jest.fn() as jest.Mock<(...args: any[]) => any>;
    mockGet.mockResolvedValueOnce({ data: { mockPayment: 'data' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const req = mockRequest();

    const client = new PaymentClient(req.session, 'http://return-url');

    const actual = await client.get('1234');

    expect(mockGet).toHaveBeenCalledWith('/card-payments/1234');

    expect(actual).toEqual({ mockPayment: 'data' });
  });

  it('logs errors if it fails to fetch data', async () => {
    const mockGet = jest.fn() as jest.Mock<(...args: any[]) => any>;
    mockGet.mockRejectedValueOnce({ data: { some: 'error' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const req = mockRequest();

    const client = new PaymentClient(req.session, 'http://return-url');

    await client.get('1234');

    expect(paymentLogger.error).toHaveBeenCalledWith('Error fetching payment', { some: 'error' });
  });
});
/* eslint-disable @typescript-eslint/no-explicit-any */
