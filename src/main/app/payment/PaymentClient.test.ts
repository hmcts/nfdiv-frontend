import axios, { AxiosInstance } from 'axios';
import config from 'config';

import { mockLogger } from '../../../test/unit/mocks/hmcts/nodejs-logging';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import * as oidc from '../auth/user/oidc';
import { DivorceOrDissolution, OrderSummary } from '../case/definition';

import { PaymentClient } from './PaymentClient';

jest.mock('axios');
jest.mock('config');
jest.mock('../auth/service/get-service-auth-token');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedConfig = config as jest.Mocked<typeof config>;
const mockGetServiceAuthToken = getServiceAuthToken as jest.Mocked<jest.Mock>;
const serviceRequestNumber = 'test123';

describe('PaymentClient', () => {
  it('creates payments for existing service requests', async () => {
    mockedConfig.get.mockReturnValueOnce('http://mock-service-url');
    mockedConfig.get.mockReturnValueOnce('mock-api-key');
    mockGetServiceAuthToken.mockReturnValueOnce('mock-server-auth-token');
    const mockPost = jest.fn().mockResolvedValueOnce({
      data: { mockPayment: 'data', next_url: 'http://example.com/pay' },
    });
    mockedAxios.create.mockReturnValueOnce({ post: mockPost } as unknown as AxiosInstance);

    const applicationFeeOrderSummary: OrderSummary = {
      Fees: [
        {
          id: '1',
          value: {
            FeeAmount: '12345',
            FeeCode: 'mock code',
            FeeVersion: 'mock version',
            FeeDescription: 'mock description',
          },
        },
      ],
      PaymentReference: 'dummyRef',
      PaymentTotal: '100',
    };
    const req = mockRequest({
      userCase: {
        id: '1234',
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        applicationFeeOrderSummary,
      },
    });

    const client = new PaymentClient(req.session, 'http://return-url');
    const actual = await client.createPaymentForServiceRequest(serviceRequestNumber, applicationFeeOrderSummary);

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'http://mock-service-url',
      headers: {
        Authorization: 'Bearer mock-user-access-token',
        ServiceAuthorization: 'mock-server-auth-token',
        'return-url': 'http://return-url',
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

  it('creates payments with new service requests', async () => {
    mockedConfig.get.mockReturnValueOnce('http://mock-service-url');
    mockedConfig.get.mockReturnValueOnce('mock-api-key');
    mockGetServiceAuthToken.mockReturnValueOnce('mock-server-auth-token');
    const mockPost = jest.fn().mockResolvedValueOnce({
      data: { mockPayment: 'data', next_url: 'http://example.com/pay' },
    });
    mockedAxios.create.mockReturnValueOnce({ post: mockPost } as unknown as AxiosInstance);

    const applicationFeeOrderSummary: OrderSummary = {
      Fees: [
        {
          id: '1',
          value: {
            FeeAmount: '12345',
            FeeCode: 'mock code',
            FeeVersion: 'mock version',
            FeeDescription: 'mock description',
          },
        },
      ],
      PaymentReference: 'dummyRef',
      PaymentTotal: '100',
    };
    const req = mockRequest({
      userCase: {
        id: '1234',
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        applicationFeeOrderSummary,
      },
    });

    const client = new PaymentClient(req.session, 'http://return-url');
    const actual = await client.createPaymentWithNewServiceRequest(serviceRequestNumber, applicationFeeOrderSummary);

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'http://mock-service-url',
      headers: {
        Authorization: 'Bearer mock-user-access-token',
        ServiceAuthorization: 'mock-server-auth-token',
        'return-url': 'http://return-url',
      },
    });

    expect(mockPost).toHaveBeenCalledWith('/card-payments', {
      amount: 123.45,
      case_type: 'NFD',
      ccd_case_number: '1234',
      currency: 'GBP',
      language: '',
      description: 'test123',
      fees: [
        {
          calculated_amount: '123.45',
          code: 'mock code',
          version: 'mock version',
        },
      ],
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
    const applicationFeeOrderSummary: OrderSummary = {
      Fees: [
        {
          id: '1',
          value: {
            FeeAmount: '12345',
            FeeCode: 'mock code',
            FeeVersion: 'mock version',
            FeeDescription: 'mock description',
          },
        },
      ],
      PaymentReference: 'dummyRef',
      PaymentTotal: '100',
    };
    const req = mockRequest({
      userCase: {
        id: '1234',
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        applicationFeeOrderSummary,
      },
    });

    const client = new PaymentClient(req.session, 'http://return-url');

    await expect(() =>
      client.createPaymentForServiceRequest(serviceRequestNumber, applicationFeeOrderSummary)
    ).rejects.toThrow('Error creating payment');

    expect(mockLogger.error).toHaveBeenCalledWith('Error creating payment', {
      mockPayment: 'data, but missing _links',
    });
  });

  it('gets payment data', async () => {
    const mockGet = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const req = mockRequest();

    const client = new PaymentClient(req.session, 'http://return-url');

    const actual = await client.getPayment('1234');

    expect(mockGet).toHaveBeenCalledWith('/card-payments/1234');

    expect(actual).toEqual({ mockPayment: 'data' });
  });

  it('gets case payment groups', async () => {
    const getSystemUserMock = jest.spyOn(oidc, 'getSystemUser');

    const systemUserAccessToken = 'token';
    getSystemUserMock.mockResolvedValue({
      accessToken: systemUserAccessToken,
      id: 'user_id',
      email: 'user@caseworker.com',
      givenName: 'case',
      familyName: 'worker',
      roles: ['caseworker'],
    });

    const mockGet = jest.fn().mockResolvedValueOnce({ data: { paymentGroups: [] } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const req = mockRequest();

    const client = new PaymentClient(req.session, 'http://return-url');

    const actual = await client.getCasePaymentGroups();

    expect(mockGet).toHaveBeenCalledWith('/cases/1234/paymentgroups', {
      headers: { Authorization: 'Bearer ' + systemUserAccessToken },
    });

    expect(actual).toEqual([]);
  });

  it('logs errors if it fails to fetch data', async () => {
    const mockGet = jest.fn().mockRejectedValueOnce({ data: { some: 'error' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const req = mockRequest();

    const client = new PaymentClient(req.session, 'http://return-url');

    await client.getPayment('1234');

    expect(mockLogger.error).toHaveBeenCalledWith('Error fetching payment', { some: 'error' });
  });
});
