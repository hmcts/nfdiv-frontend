import axios from 'axios';

import { CaseApi, getCaseApi } from './CaseApi';
import { CaseType } from './case';

jest.mock('axios');

const userDetails = {
  token: '123',
} as never;

describe('CaseApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  const mockLogger = {
    error: async (message: string) => message,
    info: async (message: string) => message,
  } as never;

  const api = new CaseApi(mockedAxios, userDetails, mockLogger);

  test('Should return case data response', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: '1234',
          case_data: {
            divorceOrDissolution: 'divorce',
          },
        },
      ],
    });

    const userCase = await api.getCase();

    expect(userCase).toStrictEqual({ id: '1234', divorceOrDissolution: 'divorce' });
  });

  test('Should return false when case was not found', async () => {
    mockedAxios.get = jest.fn().mockResolvedValue({
      data: [],
    });

    const userCase = await api.getCase();

    expect(userCase).toBe(false);
  });

  test('Should throw an error if too many cases are found', async () => {
    mockedAxios.get = jest.fn().mockResolvedValue({
      data: [{}, {}],
    });

    await expect(api.getCase()).rejects.toThrow('Too many cases assigned to user.');
  });

  test('Should throw error when case could not be retrieved', async () => {
    mockedAxios.get = jest.fn().mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'GET',
      },
    });

    await expect(api.getCase()).rejects.toThrow('Case could not be retrieved.');
  });

  test('Should return case creation response', async () => {
    const results = {
      data: {
        id: '1234',
        data: {
          divorceOrDissolution: 'divorce',
        },
      },
    };
    mockedAxios.post = jest.fn().mockResolvedValue(results);
    mockedAxios.get = jest.fn().mockResolvedValue({ data: { token: '123' } });

    const userCase = await api.createCase({
      divorceOrDissolution: CaseType.Divorce,
    });

    expect(userCase).toStrictEqual({ id: '1234', divorceOrDissolution: CaseType.Divorce });
  });

  test('Should throw error when case could not be created', async () => {
    mockedAxios.post = jest.fn().mockRejectedValue(false);

    await expect(
      api.createCase({
        divorceOrDissolution: CaseType.Divorce,
      })
    ).rejects.toThrow('Case could not be created.');
  });

  test('Should update case', async () => {
    mockedAxios.get = jest.fn().mockResolvedValue({ data: { token: '123' } });
    mockedAxios.post = jest.fn().mockResolvedValue({});

    await api.updateCase('1234', {
      divorceOrDissolution: CaseType.Divorce,
    });

    const expectedRequest = {
      data: { divorceOrDissolution: 'divorce' },
      event: { id: 'patchCase' },
      event_token: '123',
    };

    expect(mockedAxios.post).toBeCalledWith('/cases/1234/events', expectedRequest);
  });

  test('Should throw error when case could not be updated', async () => {
    mockedAxios.post = jest.fn().mockRejectedValue(false);

    await expect(
      api.updateCase('not found', {
        divorceOrDissolution: CaseType.Divorce,
      })
    ).rejects.toThrow('Case could not be updated.');
  });
});

describe('getCaseApi', () => {
  test('should create a CaseApi', () => {
    expect(getCaseApi(userDetails, {} as never)).toBeInstanceOf(CaseApi);
  });
});
