import axios from 'axios';

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

  const mockLogger = {
    error: async (message: string) => message,
    info: async (message: string) => message,
  } as never;

  const api = new CaseApi(mockedAxios, userDetails, mockLogger);

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
    mockedAxios.post.mockRejectedValue(false);

    await expect(api.getOrCreateCase(serviceType, userDetails)).rejects.toThrow('Case could not be created.');
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
    mockedAxios.post.mockResolvedValue({ data: { data: { id: '1234' } } });
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
    mockedAxios.post.mockRejectedValue(false);

    await expect(
      api.triggerEvent('not found', { divorceOrDissolution: DivorceOrDissolution.DIVORCE }, PATCH_CASE)
    ).rejects.toThrow('Case could not be updated.');
  });
});

describe('getCaseApi', () => {
  test('should create a CaseApi', () => {
    expect(getCaseApi(userDetails, {} as never)).toBeInstanceOf(CaseApi);
  });
});
