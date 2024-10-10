import axios, { AxiosInstance } from 'axios';
import config from 'config';

import { mockLogger } from '../../../test/unit/mocks/hmcts/nodejs-logging';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { DivorceOrDissolution, Fee, ListValue } from '../case/definition';

import { PaymentClient } from './PaymentClient';

jest.mock('axios');
jest.mock('config');
jest.mock('../auth/service/get-service-auth-token');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedConfig = config as jest.Mocked<typeof config>;
const mockGetServiceAuthToken = getServiceAuthToken as jest.Mocked<jest.Mock>;
const serviceRequestNumber = 'test123';

describe('PaymentClient', () => {
  it('creates payments', async () => {
    mockedConfig.get.mockReturnValueOnce('http://mock-service-url');
    mockedConfig.get.mockReturnValueOnce('mock-api-key');
    mockGetServiceAuthToken.mockReturnValueOnce('mock-server-auth-token');
    const mockPost = jest.fn().mockResolvedValueOnce({
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
    const mockPost = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data, but missing _links' } });
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

    expect(mockLogger.error).toHaveBeenCalledWith('Error creating payment', {
      mockPayment: 'data, but missing _links',
    });
  });

  it('gets payment data', async () => {
    const mockGet = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const req = mockRequest();

    const client = new PaymentClient(req.session, 'http://return-url');

    const actual = await client.get('1234');

    expect(mockGet).toHaveBeenCalledWith('/card-payments/1234');

    expect(actual).toEqual({ mockPayment: 'data' });
  });

  it('logs errors if it fails to fetch data', async () => {
    const mockGet = jest.fn().mockRejectedValueOnce({ data: { some: 'error' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const req = mockRequest();

    const client = new PaymentClient(req.session, 'http://return-url');

    await client.get('1234');

    expect(mockLogger.error).toHaveBeenCalledWith('Error fetching payment', { some: 'error' });
  });
});
