import axios from 'axios';
import config from 'config';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CHECK_ANSWERS_URL } from '../../urls';

import PCQGetController from './get';

jest.mock('axios');
jest.mock('config');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedConfig = config as jest.Mocked<typeof config>;

describe('PCQGetController', () => {
  const controller = new PCQGetController();

  test('Should redirect to PCQ', async () => {
    mockedConfig.get.mockReturnValueOnce('https://pcq.aat.platform.hmcts.net');
    mockedConfig.get.mockReturnValueOnce('SERVICE_TOKEN_KEY');
    mockedConfig.get.mockReturnValueOnce('/service-endpoint');

    const req = mockRequest();
    const res = mockResponse();

    const redirectMock = jest.fn();
    res.redirect = redirectMock;

    mockedAxios.get.mockResolvedValue({
      data: {
        status: 'UP',
      },
    });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({ applicant1PcqId: 'UUID' });

    await controller.get(req, res);

    expect(redirectMock.mock.calls[0][0]).toContain('/service-endpoint');
  });

  test('Should redirect to Check Your Answers if PCQ Health is DOWN', async () => {
    const req = mockRequest();
    const res = mockResponse();

    mockedAxios.get.mockResolvedValue(
      Promise.resolve({
        data: {
          status: 'DOWN',
        },
      })
    );

    await controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(CHECK_ANSWERS_URL);
  });

  test('Should redirect to Check Your Answers if applicant1PcqId is already populated', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.session.userCase.applicant1PcqId = '1234';

    await controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(CHECK_ANSWERS_URL);
  });

  test('Should redirect to Check Your Answers if config cannot be loaded', async () => {
    mockedConfig.get.mockReturnValueOnce(undefined);
    mockedConfig.get.mockReturnValueOnce(undefined);

    const req = mockRequest();
    const res = mockResponse();

    await controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(CHECK_ANSWERS_URL);
  });
});
