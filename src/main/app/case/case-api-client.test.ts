import axios from 'axios';
import { LoggerInstance } from 'winston';

import { UserDetails } from '../controller/AppRequest';

import { CaseApiClient, getCaseApiClient } from './case-api-client';

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
});

describe('getCaseApiClient', () => {
  test('should create a CaseApiClient', () => {
    expect(getCaseApiClient(userDetails, {} as never)).toBeInstanceOf(CaseApiClient);
  });
});
