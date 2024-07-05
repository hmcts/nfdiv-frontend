import axios, { AxiosInstance } from 'axios';
import config from 'config';

import { mockLogger } from '../../../test/unit/mocks/hmcts/nodejs-logging';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { DivorceOrDissolution } from '../case/definition';

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
    const req = mockRequest({
      userCase: {
        id: '1234',
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        applicationFeeOrderSummary: {
          Fees: [{ value: { FeeAmount: 12345, FeeCode: 'mock fee code', FeeVersion: 'mock fee version' } }],
        },
      },
    });

    const client = new PaymentClient(req.session, 'http://return-url');
    const actual = await client.create(serviceRequestNumber);

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
    const req = mockRequest({
      userCase: {
        id: '1234',
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        applicationFeeOrderSummary: {
          Fees: [{ value: { FeeAmount: 12345, FeeCode: 'mock fee code', FeeVersion: 'mock fee version' } }],
        },
      },
    });

    const client = new PaymentClient(req.session, 'http://return-url');

    await expect(() => client.create(serviceRequestNumber)).rejects.toThrow('Error creating payment');

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

  it('creates service request reference number', async () => {
    mockedConfig.get.mockReturnValueOnce('http://mock-service-url');
    mockedConfig.get.mockReturnValueOnce('mock-api-key');
    mockGetServiceAuthToken.mockReturnValueOnce('mock-server-auth-token');
    const mockPost = jest.fn().mockResolvedValueOnce({
      data: { mockPayment: 'data', service_request_reference: 'test1234' },
    });
    mockedAxios.create.mockReturnValueOnce({ post: mockPost } as unknown as AxiosInstance);
    const req = mockRequest({
      userCase: {
        id: '1234',
        applicant1FullNameOnCertificate: 'User 1',
        applicationFeeOrderSummary: {
          Fees: [{ value: { FeeAmount: 12345, FeeCode: 'mock fee code', FeeVersion: 'mock fee version' } }],
        },
      },
    });

    const client = new PaymentClient(req.session, 'http://return-url');
    const actual = await client.createServiceRequest();

    expect(mockPost).toHaveBeenCalledWith('/service-request', {
      call_back_url: 'http://return-url',
      case_payment_request: {
        action: 'payment',
        responsible_party: 'User 1',
      },
      case_reference: '1234',
      ccd_case_number: '1234',
      fees: [
        {
          calculated_amount: '123.45',
          code: 'mock fee code',
          version: 'mock fee version',
        },
      ],
      hmcts_org_id: 'ABA1',
    });

    expect(actual).toEqual({
      mockPayment: 'data',
      service_request_reference: 'test1234',
    });
  });
});
