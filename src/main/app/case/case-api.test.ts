import axios from 'axios';
import { LoggerInstance } from 'winston';

import { UserDetails } from '../controller/AppRequest';
import { PaymentModel } from '../payment/PaymentModel';

import { CaseApi, InProgressDivorceCase, getCaseApi } from './case-api';
import { CaseApiClient } from './case-api-client';
import { CITIZEN_ADD_PAYMENT, CITIZEN_UPDATE, DivorceOrDissolution, State, UserRole } from './definition';

jest.mock('axios');

const userDetails: UserDetails = {
  accessToken: '123',
  email: 'billy@bob.com',
  givenName: 'billy',
  familyName: 'bob',
  id: 'something',
  roles: ['something'],
};

describe('CaseApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  let mockLogger = {
    error: jest.fn().mockImplementation((message: string) => message),
    info: jest.fn().mockImplementation((message: string) => message),
  } as unknown as LoggerInstance;

  let api: CaseApi;
  beforeEach(() => {
    mockLogger = {
      error: jest.fn().mockImplementation((message: string) => message),
      info: jest.fn().mockImplementation((message: string) => message),
    } as unknown as LoggerInstance;

    api = new CaseApi(new CaseApiClient(mockedAxios, mockLogger));
  });

  const serviceType = DivorceOrDissolution.DIVORCE;

  test.each([DivorceOrDissolution.DIVORCE, DivorceOrDissolution.DISSOLUTION])(
    'Should return %s case data response',
    async caseType => {
      mockedAxios.post.mockResolvedValue({
        data: {
          cases: [
            {
              id: '1234',
              state: State.Draft,
              case_data: {
                divorceOrDissolution: 'divorce',
                applicationFeeOrderSummary: [{ test: 'fees' }],
                applicationPayments: [{ test: 'payment' }],
              },
            },
            {
              id: '1234',
              state: State.Draft,
              case_data: {
                divorceOrDissolution: 'dissolution',
                applicationFeeOrderSummary: [{ test: 'fees' }],
                applicationPayments: [{ test: 'payment' }],
              },
            },
          ],
        },
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
    mockedAxios.post.mockRejectedValue({
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
    mockedAxios.post.mockResolvedValueOnce({
      data: { cases: [] },
    });
    mockedAxios.post.mockResolvedValueOnce({
      data: { cases: [] },
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
    mockedAxios.post.mockResolvedValueOnce({
      data: { cases: [] },
    });
    mockedAxios.post.mockResolvedValueOnce({
      data: { cases: [] },
    });
    mockedAxios.get.mockResolvedValueOnce({ data: { token: '123' } });
    mockedAxios.post.mockRejectedValue({
      config: { method: 'POST', url: 'https://example.com' },
      request: 'mock request',
    });

    await expect(api.getOrCreateCase(serviceType, userDetails)).rejects.toThrow('Case could not be created.');

    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST https://example.com');
  });

  test('Should throw an error if in progress divorce case is found', async () => {
    const mockCase = { case_data: { D8DivorceUnit: 'serviceCentre' }, state: 'AwaitingDecreeNisi' };

    mockedAxios.post.mockResolvedValueOnce({
      data: { cases: [mockCase] },
    });
    mockedAxios.post.mockResolvedValueOnce({
      data: { cases: [] },
    });

    try {
      await api.getOrCreateCase(serviceType, userDetails);
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e instanceof InProgressDivorceCase).toBeTruthy();

      return;
    }
    expect(false).toBeTruthy();
  });

  test('Should ignore incomplete divorce cases', async () => {
    const mockCase = { case_data: { D8DivorceUnit: 'serviceCentre' }, state: 'AwaitingPayment' };
    mockedAxios.post.mockImplementation(async url => {
      if (url.endsWith('DIVORCE')) {
        return Promise.resolve({ data: { cases: [mockCase] } });
      } else {
        return Promise.resolve({
          data: {
            cases: [
              {
                id: '1',
                state: State.Draft,
                case_data: { divorceOrDissolution: serviceType },
              },
            ],
          },
        });
      }
    });

    const userCase = await api.getOrCreateCase(serviceType, userDetails);
    expect(userCase).toStrictEqual({
      id: '1',
      state: State.Draft,
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    });
  });

  test('Should ignore divorce cases not assigned to the service center', async () => {
    const mockCase = { case_data: { D8DivorceUnit: 'BuryStEdmunds' }, state: 'AwaitingDecreeNisi' };
    mockedAxios.post.mockResolvedValueOnce({
      data: { cases: [mockCase] },
    });
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        cases: [
          {
            id: '1',
            state: State.Draft,
            case_data: {
              divorceOrDissolution: serviceType,
            },
          },
        ],
      },
    });

    const userCase = await api.getOrCreateCase(serviceType, userDetails);
    expect(userCase).toStrictEqual({
      id: '1',
      state: State.Draft,
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    });
  });

  test('Should retrieve the first case if two cases found', async () => {
    const firstMockCase = {
      id: '1',
      state: State.Draft,
      case_data: {
        divorceOrDissolution: serviceType,
      },
    };
    const secondMockCase = {
      id: '2',
      state: State.Draft,
      case_data: {
        divorceOrDissolution: serviceType,
      },
    };

    mockedAxios.post.mockResolvedValue({
      data: { cases: [firstMockCase, secondMockCase] },
    });

    const userCase = await api.getOrCreateCase(serviceType, userDetails);

    expect(userCase).toStrictEqual({
      id: '1',
      state: State.Draft,
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    });
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
      data: { applicationPayments: payments.list },
      event: { id: CITIZEN_ADD_PAYMENT },
      event_token: '123',
    };

    expect(mockedAxios.post).toBeCalledWith('/cases/1234/events', expectedRequest);
  });

  test('Should throw error when case could not be updated', async () => {
    mockedAxios.get.mockResolvedValue({ data: { token: 'event-token' } });
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

  test.each([409, 422])('Should not throw an error if %s is returned once', async statusCode => {
    mockedAxios.get.mockResolvedValue({ data: { token: '123' } });
    mockedAxios.post
      .mockResolvedValue({
        data: { data: { id: '1234', divorceOrDissolution: DivorceOrDissolution.DIVORCE } },
      })
      .mockRejectedValueOnce({
        config: { method: 'POST', url: 'https://example.com' },
        response: { status: statusCode, data: 'mock error' },
      });
    const payments = new PaymentModel([]);

    await api.addPayment('1234', payments.list);

    const expectedRequest = {
      data: { applicationPayments: payments.list },
      event: { id: CITIZEN_ADD_PAYMENT },
      event_token: '123',
    };
    expect(mockedAxios.post).toBeCalledWith('/cases/1234/events', expectedRequest);
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  test.each([409, 422])('Should throw an error if %s is returned more than maxRetries', async statusCode => {
    mockedAxios.get.mockResolvedValue({ data: { token: '123' } });
    mockedAxios.post.mockRejectedValue({
      config: { method: 'POST', url: 'https://example.com' },
      response: { status: statusCode, data: 'mock error' },
    });
    const payments = new PaymentModel([]);

    await expect(api.addPayment('1234', payments.list)).rejects.toThrow('Case could not be updated.');

    [1, 2, 3].forEach(retry =>
      expect(mockLogger.info).toHaveBeenCalledWith(
        `retrying send event due to ${statusCode}. this is retry no (${retry})`
      )
    );
    expect(mockLogger.error).toHaveBeenCalledWith(`API Error POST https://example.com ${statusCode}`);
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
    expect(userCase).toStrictEqual({ id: '1234', state: 'Draft', accessCode: 'NFSDCLV3' });
  });

  test('Should throw error when case could not be fetched', async () => {
    mockedAxios.get.mockRejectedValue({
      config: { method: 'GET', url: 'https://example.com' },
      request: 'mock request',
    });

    await expect(api.getCaseById('1234')).rejects.toThrow('Case could not be retrieved.');

    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET https://example.com');
  });

  test('isApplicant2() should return true if the case role contains applicant 2', async () => {
    mockedAxios.get.mockResolvedValue({ data: { case_users: [{ case_role: UserRole.APPLICANT_2 }] } });

    const isApplicant2 = await api.isApplicant2('1234123412341234', userDetails.id);
    expect(isApplicant2).toBe(true);
  });

  test('isApplicantAlreadyLinked() should return true if the case role contains applicant 2', async () => {
    const mockCase = {
      id: '1',
      state: State.Draft,
      case_data: {
        divorceOrDissolution: serviceType,
      },
    };

    mockedAxios.post.mockResolvedValue({
      data: { cases: [mockCase] },
    });
    mockedAxios.get.mockResolvedValue({ data: { case_users: [{ case_role: UserRole.APPLICANT_2 }] } });

    const isApplicant2AlreadyLinked = await api.isApplicantAlreadyLinked(serviceType, userDetails);
    expect(isApplicant2AlreadyLinked).toBe(true);
  });

  test('isApplicantAlreadyLinked() should return false if the case role contains creator', async () => {
    const mockCase = {
      id: '1',
      state: State.Draft,
      case_data: {
        divorceOrDissolution: serviceType,
      },
    };

    mockedAxios.post.mockResolvedValue({
      data: { cases: [mockCase] },
    });
    mockedAxios.get.mockResolvedValue({ data: { case_users: [{ case_role: UserRole.CREATOR }] } });

    const isApplicant2AlreadyLinked = await api.isApplicantAlreadyLinked(serviceType, userDetails);
    expect(isApplicant2AlreadyLinked).toBe(false);
  });

  test('isApplicantAlreadyLinked() should return false if the case role does not contain applicant 2', async () => {
    const mockCase = {
      id: '1',
      state: State.Draft,
      case_data: {
        divorceOrDissolution: serviceType,
      },
    };

    mockedAxios.get.mockResolvedValue({ data: { case_users: [{ case_role: UserRole.CASE_WORKER }] } });
    mockedAxios.post.mockResolvedValue({ data: { cases: [mockCase] } });

    const isApplicantAlreadyLinked = await api.isApplicantAlreadyLinked(serviceType, userDetails);
    expect(isApplicantAlreadyLinked).toBe(false);
  });

  test('isApplicantAlreadyLinked() returns false if case is not found', async () => {
    mockedAxios.post.mockResolvedValue({ data: { cases: [] } });

    const isApplicant2AlreadyLinked = await api.isApplicantAlreadyLinked(serviceType, userDetails);
    expect(isApplicant2AlreadyLinked).toBe(false);
  });

  test('Should catch all errors', async () => {
    mockedAxios.get.mockRejectedValue({
      message: 'Error',
    });

    await expect(api.getCaseById('1234')).rejects.toThrow('Case could not be retrieved.');

    expect(mockLogger.error).toHaveBeenCalledWith('API Error', 'Error');
  });
});

describe('getCaseApi', () => {
  test('should create a CaseApi', () => {
    expect(getCaseApi(userDetails, {} as never)).toBeInstanceOf(CaseApi);
  });
});
