import axios from 'axios';
import { LoggerInstance } from 'winston';

import { UserDetails } from '../controller/AppRequest';
import { PaymentModel } from '../payment/PaymentModel';

import { CaseApiClient, getCaseApiClient } from './case-api-client';
import { CASE_TYPE } from './case-type';
import { CITIZEN_ADD_PAYMENT, CITIZEN_UPDATE, DivorceOrDissolution, State } from './definition';

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

  let api: CaseApiClient;
  beforeEach(() => {
    mockLogger = {
      error: jest.fn().mockImplementation((message: string) => message),
      info: jest.fn().mockImplementation((message: string) => message),
    } as unknown as LoggerInstance;

    api = new CaseApiClient(mockedAxios, mockLogger);
  });

  test('Should return case roles for userId and caseId passed', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        case_users: [
          {
            case_id: '1624351572550045',
            user_id: '372ff9c1-9930-46d9-8bd2-88dd26ba2475',
            case_role: '[APPLICANTTWO]',
          },
        ],
      },
    });

    const userCase = await api.getCaseUserRoles('1234123412341234', userDetails.id);
    expect(userCase).toStrictEqual({
      case_users: [
        {
          case_id: '1624351572550045',
          user_id: '372ff9c1-9930-46d9-8bd2-88dd26ba2475',
          case_role: '[APPLICANTTWO]',
        },
      ],
    });
  });

  test('Should throw error when case roles could not be fetched', async () => {
    mockedAxios.get.mockRejectedValue({
      config: { method: 'GET', url: 'https://example.com/case-users' },
      request: 'mock request',
    });

    await expect(api.getCaseUserRoles('1234123412341234', userDetails.id)).rejects.toThrow(
      'Case roles could not be fetched.'
    );

    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET https://example.com/case-users');
  });

  test.each([DivorceOrDissolution.DIVORCE, DivorceOrDissolution.DISSOLUTION])(
    'Should return %s case data response',
    async serviceType => {
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

      const userCases = await api.findExistingUserCases(CASE_TYPE, serviceType);

      expect(userCases[0]).toStrictEqual({
        id: '1234',
        state: State.Draft,
        case_data: {
          divorceOrDissolution: serviceType,
          applicationFeeOrderSummary: [{ test: 'fees' }],
          applicationPayments: [{ test: 'payment' }],
        },
      });
    }
  );

  test('Should return DIVORCE caseType data response', async () => {
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

    const userCases = await api.findExistingUserCases('DIVORCE', DivorceOrDissolution.DIVORCE);

    expect(userCases[0]).toStrictEqual({
      id: '1234',
      state: State.Draft,
      case_data: {
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        applicationFeeOrderSummary: [{ test: 'fees' }],
        applicationPayments: [{ test: 'payment' }],
      },
    });
  });

  test('Should find users invite case', async () => {
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

    const userCases = await api.findUserInviteCases('user.email@gmail.com', CASE_TYPE, DivorceOrDissolution.DIVORCE);

    expect(userCases[0]).toStrictEqual({
      id: '1234',
      state: State.Draft,
      case_data: {
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        applicationFeeOrderSummary: [{ test: 'fees' }],
        applicationPayments: [{ test: 'payment' }],
      },
    });
  });

  test('Should throw error when case could not be retrieved', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });

    await expect(api.findExistingUserCases(CASE_TYPE, DivorceOrDissolution.DIVORCE)).rejects.toThrow(
      'Case could not be retrieved.'
    );
  });

  test('Should return false case could not be retrieved and status code is 404', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 404,
      },
      config: {
        method: 'POST',
      },
    });

    expect(await api.findExistingUserCases(CASE_TYPE, DivorceOrDissolution.DIVORCE)).toStrictEqual(false);
  });

  test('Should create a case', async () => {
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

    const userCase = await api.createCase(DivorceOrDissolution.DIVORCE, userDetails);

    expect(userCase).toStrictEqual({
      id: '1234',
      state: State.Draft,
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    });
  });

  test('Should throw error when case could not be created', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { token: '123' } });
    mockedAxios.post.mockRejectedValue({
      config: { method: 'POST', url: 'https://example.com' },
      request: 'mock request',
    });

    await expect(api.createCase(DivorceOrDissolution.DIVORCE, userDetails)).rejects.toThrow(
      'Case could not be created.'
    );

    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST https://example.com');
  });

  test('Should retrieve the first case if two cases found', async () => {
    const firstMockCase = {
      id: '1',
      state: State.Draft,
      case_data: {
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      },
    };
    const secondMockCase = {
      id: '2',
      state: State.Draft,
      case_data: {
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      },
    };

    mockedAxios.post.mockResolvedValue({
      data: { cases: [firstMockCase, secondMockCase] },
    });

    const userCases = await api.findExistingUserCases(CASE_TYPE, DivorceOrDissolution.DIVORCE);

    expect(userCases[0]).toStrictEqual({
      id: '1',
      state: State.Draft,
      case_data: {
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      },
    });
  });

  test('Should update case', async () => {
    mockedAxios.get.mockResolvedValue({ data: { token: '123' } });
    mockedAxios.post.mockResolvedValue({
      data: { data: { id: '1234', divorceOrDissolution: DivorceOrDissolution.DIVORCE } },
    });
    const caseData = { divorceOrDissolution: DivorceOrDissolution.DIVORCE };
    await api.sendEvent('1234', caseData, CITIZEN_UPDATE);

    const expectedRequest = {
      data: caseData,
      event: { id: CITIZEN_UPDATE },
      event_token: '123',
    };

    expect(mockedAxios.post).toHaveBeenCalledWith('/cases/1234/events', expectedRequest);
  });

  test('Should throw error when case could not be updated', async () => {
    mockedAxios.get.mockResolvedValue({ data: { token: 'event-token' } });
    mockedAxios.post.mockRejectedValue({
      config: { method: 'POST', url: 'https://example.com' },
      response: { status: 500, data: 'mock error' },
    });

    await expect(
      api.sendEvent('not found', { divorceOrDissolution: DivorceOrDissolution.DIVORCE }, CITIZEN_UPDATE)
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

    await api.sendEvent('1234', { applicationPayments: payments.list }, CITIZEN_ADD_PAYMENT);

    const expectedRequest = {
      data: { applicationPayments: payments.list },
      event: { id: CITIZEN_ADD_PAYMENT },
      event_token: '123',
    };
    expect(mockedAxios.post).toHaveBeenCalledWith('/cases/1234/events', expectedRequest);
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  test.each([409, 422, 502, 504])('Should throw an error if %s is returned more than maxRetries', async statusCode => {
    mockedAxios.get.mockResolvedValue({ data: { token: '123' } });
    mockedAxios.post.mockRejectedValue({
      config: { method: 'POST', url: 'https://example.com' },
      response: { status: statusCode, data: 'mock error' },
    });
    const payments = new PaymentModel([]);

    await expect(api.sendEvent('1234', { applicationPayments: payments.list }, CITIZEN_ADD_PAYMENT)).rejects.toThrow(
      'Case could not be updated.'
    );

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

  test('Should catch all errors', async () => {
    mockedAxios.get.mockRejectedValue({
      message: 'Error',
    });

    await expect(api.getCaseById('1234')).rejects.toThrow('Case could not be retrieved.');

    expect(mockLogger.error).toHaveBeenCalledWith('API Error', 'Error');
  });
});

describe('getCaseApiClient', () => {
  test('should create a CaseApiClient', () => {
    expect(getCaseApiClient(userDetails, {} as never)).toBeInstanceOf(CaseApiClient);
  });
});
