import axios from 'axios';

import { CaseApi } from './CaseApi';
import { DivorceOrCivilPartnership } from './case';

describe('CaseApi', () => {
  const results = {
    data: {
      caseId: '1234',
      error: null,
      status: 'success',
      allocatedCourt: {
        court: 'court',
      },
      data: {
        divorceOrDissolution: 'divorce',
      },
    },
  };

  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  const mockLogger = {
    error: async (message: string) => message,
    info: async (message: string) => message,
  } as never;
  const api = new CaseApi(mockedAxios, mockLogger);

  test('Should return case data response', async () => {
    mockedAxios.get = jest.fn().mockResolvedValue(results);

    const userCase = await api.getCase();

    expect(userCase).toStrictEqual({ id: '1234', divorceOrDissolution: 'divorce' });
  });

  test('Should return false when case was not found', async () => {
    mockedAxios.get = jest.fn().mockRejectedValue({
      response: {
        status: 404,
      },
    });

    const userCase = await api.getCase();

    expect(userCase).toBe(false);
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
    mockedAxios.post = jest.fn().mockResolvedValue(results);

    const userCase = await api.createCase({
      divorceOrDissolution: DivorceOrCivilPartnership.Divorce,
    });

    expect(userCase).toBe(results.data);
  });

  test('Should throw error when case could not be created', async () => {
    mockedAxios.post = jest.fn().mockRejectedValue(false);

    await expect(
      api.createCase({
        divorceOrDissolution: DivorceOrCivilPartnership.Divorce,
      })
    ).rejects.toThrow('Case could not be created.');
  });

  test('Should return case update response', async () => {
    mockedAxios.patch = jest.fn().mockResolvedValue(results);

    const userCase = await api.updateCase('1234', {
      divorceOrDissolution: DivorceOrCivilPartnership.Divorce,
    });

    expect(userCase).toBe(results.data);
  });

  test('Should throw error when case could not be updated', async () => {
    mockedAxios.patch = jest.fn().mockRejectedValue(false);

    await expect(
      api.updateCase('not found', {
        divorceOrDissolution: DivorceOrCivilPartnership.Divorce,
      })
    ).rejects.toThrow('Case could not be updated.');
  });
});
