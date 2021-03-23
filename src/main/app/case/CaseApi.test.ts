import axios from 'axios';
import { LoggerInstance } from 'winston';

import { UserDetails } from '../controller/AppRequest';

import { CaseApi, getCaseApi } from './CaseApi';
import { DivorceOrDissolution, PATCH_CASE } from './definition';

jest.mock('axios');

const userDetails: UserDetails = {
  accessToken: '123',
  email: 'billy@bob.com',
  givenName: 'billy',
  familyName: 'bob',
  id: 'something',
};

describe('CaseApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  let mockLogger = ({
    error: jest.fn().mockImplementation((message: string) => message),
    info: jest.fn().mockImplementation((message: string) => message),
  } as unknown) as LoggerInstance;

  let api = new CaseApi(mockedAxios, userDetails, mockLogger);
  beforeEach(() => {
    mockLogger = ({
      error: jest.fn().mockImplementation((message: string) => message),
      info: jest.fn().mockImplementation((message: string) => message),
    } as unknown) as LoggerInstance;

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
            case_data: {
              divorceOrDissolution: 'divorce',
            },
          },
          {
            id: '1234',
            case_data: {
              divorceOrDissolution: 'dissolution',
            },
          },
        ],
      });

      const userCase = await api.getOrCreateCase(caseType, userDetails);

      expect(userCase).toStrictEqual({ id: '1234', divorceOrDissolution: caseType });
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
        data: {
          divorceOrDissolution: 'divorce',
        },
      },
    };
    mockedAxios.post.mockResolvedValueOnce(results);
    mockedAxios.get.mockResolvedValueOnce({ data: { token: '123' } });

    const userCase = await api.getOrCreateCase(serviceType, userDetails);

    expect(userCase).toStrictEqual({ id: '1234', divorceOrDissolution: DivorceOrDissolution.DIVORCE });
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
    await api.triggerEvent('1234', caseData, PATCH_CASE);

    const expectedRequest = {
      data: caseData,
      event: { id: PATCH_CASE },
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
      api.triggerEvent('not found', { divorceOrDissolution: DivorceOrDissolution.DIVORCE }, PATCH_CASE)
    ).rejects.toThrow('Case could not be updated.');

    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST https://example.com 500');
    expect(mockLogger.info).toHaveBeenCalledWith('Response: ', 'mock error');
  });

  test('throws an error when the updated case does not match the submitted case', async () => {
    mockedAxios.get.mockResolvedValue({ data: { token: '123' } });
    mockedAxios.post.mockResolvedValue({ data: { data: { D8MarriageDate: '2000-12-31' } } });
    const userData = {
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      relationshipDate: { day: '11', month: '12', year: '2000' },
      nullField: null,
    };

    await expect(api.triggerEvent('1234', userData, PATCH_CASE)).rejects.toThrow('Case could not be updated.');

    expect(mockLogger.error).toHaveBeenCalledWith(
      'API Error',
      'Data not updated correctly. API "divorceOrDissolution" field value did not match users input/form value.'
    );
    expect(mockLogger.info).not.toHaveBeenCalled();
  });
});

describe('getCaseApi', () => {
  test('should create a CaseApi', () => {
    expect(getCaseApi(userDetails, {} as never)).toBeInstanceOf(CaseApi);
  });
});
