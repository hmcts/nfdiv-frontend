import axios from 'axios';
import { LoggerInstance } from 'winston';

import { UserDetails } from '../controller/AppRequest';
import { PaymentModel } from '../payment/PaymentModel';

import { CaseApi, getCaseApi } from './CaseApi';
import { CITIZEN_ADD_PAYMENT, CITIZEN_UPDATE, DivorceOrDissolution, State, UserRole } from './definition';

jest.mock('axios');

const userDetails: UserDetails = {
  accessToken: '123',
  email: 'billy@bob.com',
  roles: [UserRole.CITIZEN],
  givenName: 'billy',
  familyName: 'bob',
  id: 'something',
};

describe('CaseApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  let mockLogger = {
    error: jest.fn().mockImplementation((message: string) => message),
    info: jest.fn().mockImplementation((message: string) => message),
  } as unknown as LoggerInstance;

  let api = new CaseApi(mockedAxios, userDetails, mockLogger);
  beforeEach(() => {
    mockLogger = {
      error: jest.fn().mockImplementation((message: string) => message),
      info: jest.fn().mockImplementation((message: string) => message),
    } as unknown as LoggerInstance;

    api = new CaseApi(mockedAxios, userDetails, mockLogger);
  });

  const serviceType = DivorceOrDissolution.DIVORCE;

  test.each([DivorceOrDissolution.DIVORCE, DivorceOrDissolution.DISSOLUTION])(
    'Should return %s case data response',
    async caseType => {
      mockedAxios.get.mockResolvedValue({
        data: [
          {
            id: '1234',
            state: State.Draft,
            case_data: {
              divorceOrDissolution: 'divorce',
              applicationFeeOrderSummary: [{ test: 'fees' }],
              payments: [{ test: 'payment' }],
            },
          },
          {
            id: '1234',
            state: State.Draft,
            case_data: {
              divorceOrDissolution: 'dissolution',
              applicationFeeOrderSummary: [{ test: 'fees' }],
              payments: [{ test: 'payment' }],
            },
          },
        ],
      });

      const userCase = await api.getOrCreateCase(caseType, userDetails);

      expect(userCase).toStrictEqual({
        id: '1234',
        state: State.Draft,
        divorceOrDissolution: caseType,
        applicationFeeOrderSummary: [{ test: 'fees' }],
        payments: [{ test: 'payment' }],
      });
    }
  );

  test('Should throw error when case could not be retrieved', async () => {
    mockedAxios.get.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'GET',
      },
    });

    await expect(api.getOrCreateCase(serviceType, userDetails)).rejects.toThrow('Case could not be retrieved.');
  });

  test('Should create a case if one is not found', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [],
    });
    const results = {
      data: {
        id: '1234',
        state: State.Draft,
        data: {
          divorceOrDissolution: 'divorce',
        },
      },
    };
    mockedAxios.post.mockResolvedValueOnce(results);
    mockedAxios.get.mockResolvedValueOnce({ data: { token: '123' } });

    const userCase = await api.getOrCreateCase(serviceType, userDetails);

    expect(userCase).toStrictEqual({
      id: '1234',
      state: State.Draft,
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    });
  });

  test('Should throw error when case could not be created', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [],
    });
    mockedAxios.get.mockResolvedValueOnce({ data: { token: '123' } });
    mockedAxios.post.mockRejectedValue({
      config: { method: 'POST', url: 'https://example.com' },
      request: 'mock request',
    });

    await expect(api.getOrCreateCase(serviceType, userDetails)).rejects.toThrow('Case could not be created.');

    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST https://example.com');
  });

  test('Should throw an error if too many cases are found', async () => {
    const mockCase = { case_data: { divorceOrDissolution: serviceType } };

    mockedAxios.get.mockResolvedValue({
      data: [mockCase, mockCase],
    });

    await expect(api.getOrCreateCase(serviceType, userDetails)).rejects.toThrow('Too many cases assigned to user.');
  });

  test('Should update case', async () => {
    mockedAxios.get.mockResolvedValue({ data: { token: '123' } });
    mockedAxios.post.mockResolvedValue({
      data: { data: { id: '1234', divorceOrDissolution: DivorceOrDissolution.DIVORCE } },
    });
    const caseData = { divorceOrDissolution: DivorceOrDissolution.DIVORCE };
    await api.triggerEvent('1234', caseData, CITIZEN_UPDATE);

    const expectedRequest = {
      data: caseData,
      event: { id: CITIZEN_UPDATE },
      event_token: '123',
    };

    expect(mockedAxios.post).toBeCalledWith('/cases/1234/events', expectedRequest);
  });

  test('Should update the case with a new payment', async () => {
    mockedAxios.get.mockResolvedValue({ data: { token: '123' } });
    mockedAxios.post.mockResolvedValue({
      data: { data: { id: '1234', divorceOrDissolution: DivorceOrDissolution.DIVORCE } },
    });
    const payments = new PaymentModel([]);
    await api.addPayment('1234', payments.list);

    const expectedRequest = {
      data: { payments: payments.list },
      event: { id: CITIZEN_ADD_PAYMENT },
      event_token: '123',
    };

    expect(mockedAxios.post).toBeCalledWith('/cases/1234/events', expectedRequest);
  });

  test('Should throw error when case could not be updated', async () => {
    mockedAxios.post.mockRejectedValue({
      config: { method: 'POST', url: 'https://example.com' },
      response: { status: 500, data: 'mock error' },
    });

    await expect(
      api.triggerEvent('not found', { divorceOrDissolution: DivorceOrDissolution.DIVORCE }, CITIZEN_UPDATE)
    ).rejects.toThrow('Case could not be updated.');

    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST https://example.com 500');
    expect(mockLogger.info).toHaveBeenCalledWith('Response: ', 'mock error');
  });

  test('Should return case for caseId passed', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        id: '1234',
        state: State.Draft,
        data: {
          accessCode: 'NFSDCLV3',
        },
      },
    });

    const userCase = await api.getCaseById('1234');
    expect(userCase).toStrictEqual({ accessCode: 'NFSDCLV3' });
  });

  test('Should throw error when case could not be fetched', async () => {
    mockedAxios.get.mockRejectedValue({
      config: { method: 'GET', url: 'https://example.com' },
      request: 'mock request',
    });

    await expect(api.getCaseById('1234')).rejects.toThrow('Case could not be retrieved.');

    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET https://example.com');
  });

  test('Should catch all errors', async () => {
    mockedAxios.get.mockRejectedValue({
      message: 'Error',
    });

    await expect(api.getCaseById('1234')).rejects.toThrow('Case could not be retrieved.');

    expect(mockLogger.error).toHaveBeenCalledWith('API Error', 'Error');
  });

  test('isApplicant2() returns true if they are logged in as applicant 2', () => {
    api = new CaseApi(mockedAxios, { ...userDetails, roles: [UserRole.CITIZEN, UserRole.APPLICANT_2] }, mockLogger);

    expect(api.isApplicant2()).toBe(true);
  });
});

describe('getCaseApi', () => {
  test('should create a CaseApi', () => {
    expect(getCaseApi(userDetails, {} as never)).toBeInstanceOf(CaseApi);
  });
});
