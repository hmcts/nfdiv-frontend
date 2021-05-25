import axios, { AxiosInstance } from 'axios';
import config from 'config';

import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { PaymentClient } from './PaymentClient';

jest.mock('axios');
jest.mock('config');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedConfig = config as jest.Mocked<typeof config>;

describe('PaymentClient', () => {
  it('creates payments', async () => {
    mockedConfig.get.mockReturnValueOnce('http://mock-service-url');
    mockedConfig.get.mockReturnValueOnce('mock-api-key');
    const mockPost = jest.fn().mockResolvedValue({ data: { mockPayment: 'data' } });
    mockedAxios.create.mockReturnValueOnce({ post: mockPost } as unknown as AxiosInstance);
    const req = mockRequest({
      userCase: {
        applicant1Address1: 'address1',
        applicant1Address2: 'address2',
        applicant1AddressTown: 'town',
        applicant1AddressPostcode: 'postcode',
        applicant1AddressCountry: 'country',
      },
    });

    const client = new PaymentClient(req.session, 'http://return-url');

    const actual = await client.create();

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'http://mock-service-url',
      headers: { authorization: 'Bearer mock-api-key' },
    });

    expect(mockPost).toHaveBeenCalledWith('/v1/payments', {
      amount: 55000,
      delayed_capture: false,
      description: 'Divorce application fee',
      email: 'test@example.com',
      language: 'en',
      metadata: {
        caseId: '1234',
      },
      prefilled_cardholder_details: {
        billing_address: {
          line1: 'address1',
          line2: 'address2',
          city: 'town',
          postcode: 'postcode',
          country: 'country',
        },
        cardholder_name: 'First name Last name',
      },
      reference: '1234',
      return_url: 'http://return-url',
    });

    expect(actual).toEqual({ mockPayment: 'data' });
  });

  it('gets payment data', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: { mockPayment: 'data' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const req = mockRequest();

    const client = new PaymentClient(req.session, 'http://return-url');

    const actual = await client.get('1234');

    expect(mockGet).toHaveBeenCalledWith('/v1/payments/1234');

    expect(actual).toEqual({ mockPayment: 'data' });
  });
});
