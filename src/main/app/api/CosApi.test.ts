import axios from 'axios';

import { CosApi } from './CosApi';

describe('CosApi', () => {
  const results = {
    data: {
      caseId: '1234',
      error: null,
      status: 'success',
      allocatedCourt: {
        court: 'court',
      },
    },
  };

  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  const mockLogger = {
    error: async (message: string) => message,
  } as never;
  const api = new CosApi(mockedAxios, mockLogger);

  //TODO check the returned data once backend has been implemented
  test('Should return case data response', async () => {
    mockedAxios.get = jest.fn().mockResolvedValue(results);

    const userCase = await api.getCase();

    expect(userCase).toBe(results.data);
  });

  test('Should return false when case was not returned', async () => {
    mockedAxios.get = jest.fn().mockRejectedValue(false);

    const userCase = await api.getCase();

    expect(userCase).toBe(false);
  });

  test('Should return case creation response', async () => {
    mockedAxios.post = jest.fn().mockResolvedValue(results);

    const userCase = await api.createCase({
      divorceOrDissolution: 'divorce',
    });

    expect(userCase).toBe(results.data);
  });

  test('Should throw error when case could not be created', async () => {
    mockedAxios.post = jest.fn().mockRejectedValue(false);

    await expect(
      api.createCase({
        divorceOrDissolution: 'divorce',
      })
    ).rejects.toThrow('Case could not be created.');
  });
});
