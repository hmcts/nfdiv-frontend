jest.mock('axios');
jest.mock('@hmcts/nodejs-logging');
jest.useFakeTimers('legacy');

import { Logger } from '@hmcts/nodejs-logging';
import axios, { AxiosStatic } from 'axios';
const logger = {
  info: jest.fn(),
  error: jest.fn(),
};
Logger.getLogger.mockReturnValue(logger);

import { getFee, initFees } from './get-fee';

const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe('initFees', () => {
  test('Should set an interval to start fetching a token', () => {
    mockedAxios.get.mockResolvedValue({ amount: 5 });

    initFees();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://fees-register-api-aat.service.core-compute-aat.internal/fees-register/fees/lookup?channel=default&jurisdiction1=family&jurisdiction2=family court&service=divorce&keyword=DivorceCivPart&event=issue'
    );
  });

  test('Should log errors', () => {
    mockedAxios.get.mockRejectedValue({ response: { status: 500, data: 'Error' } });

    initFees();
    return new Promise<void>(resolve => {
      setImmediate(() => {
        expect(logger.error).toHaveBeenCalledWith(500, 'Error');
        resolve();
      });
    });
  });
});

describe('getFee', () => {
  test('Should return a fee', async () => {
    mockedAxios.get.mockResolvedValue({ amount: 5 });

    initFees();

    return new Promise<void>(resolve => {
      setImmediate(() => {
        expect(getFee('DivorceAmendPetition')).not.toBe('£5');
        resolve();
      });
    });
  });
});
