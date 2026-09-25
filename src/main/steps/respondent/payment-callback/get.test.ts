/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from '@jest/globals';

import { mockRequest } from '../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../test/unit/utils/mockResponse.js';
import { ApplicationType, FINAL_ORDER_PAYMENT_MADE, PaymentStatus, State } from '../../../app/case/definition.js';
import { HUB_PAGE, PAY_YOUR_FINAL_ORDER_FEE, RESPONDENT } from '../../urls.js';

jest.unstable_mockModule(
  '../../../app/payment/PaymentClient',
  async () => import('../../../app/payment/__mocks__/PaymentClient.js')
);

const { mockCreate, mockGet } = (await import('../../../app/payment/PaymentClient.js')) as unknown as {
  mockCreate: jest.Mock<(...args: any[]) => any>;
  mockGet: jest.Mock<(...args: any[]) => any>;
};
const { default: PaymentCallbackGetController } = await import('./get.js');
describe('PaymentCallbackGetController', () => {
  const paymentController = new PaymentCallbackGetController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockGet.mockClear();
  });

  describe('callback', () => {
    it('saves and redirects to the submitted page if last payment was successful', async () => {
      const userCase = {
        state: State.AwaitingFinalOrderPayment,
        applicationType: ApplicationType.SOLE_APPLICATION,
        finalOrderPayments: [
          {
            id: 'mock payment id',
            value: {
              amount: 55000,
              channel: 'mock payment provider',
              feeCode: 'FEE0002',
              reference: 'mock ref',
              status: PaymentStatus.IN_PROGRESS,
              transactionId: 'mock payment id',
            },
          },
        ],
      };
      const req = mockRequest({
        userCase,
      });
      req.locals.api.triggerPaymentEvent = jest.fn().mockReturnValue(userCase) as any;
      const res = mockResponse();

      (mockGet as jest.Mock<(...args: any[]) => any>).mockReturnValueOnce({
        payment_id: 'mock payment id',
        status: 'Success',
      });

      await paymentController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith('mock ref');

      expect(req.locals.api.triggerPaymentEvent).toHaveBeenCalledWith(
        '1234',
        { finalOrderPayments: expect.any(Array) },
        FINAL_ORDER_PAYMENT_MADE
      );

      expect(res.redirect).toHaveBeenCalledWith(RESPONDENT + HUB_PAGE);
    });

    it('redirects to the hub page if the state is not awaiting payment', async () => {
      const req = mockRequest({
        userCase: {
          state: State.RespondentFinalOrderRequested,
        },
      });
      const res = mockResponse();

      await paymentController.get(req, res);

      expect(mockGet).not.toHaveBeenCalled();
      expect(req.locals.api.triggerPaymentEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(RESPONDENT + HUB_PAGE);
    });

    it('redirects to the hub page if there is no last payment', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingFinalOrderPayment,
        },
      });
      const res = mockResponse();

      await paymentController.get(req, res);

      expect(mockGet).not.toHaveBeenCalled();
      expect(req.locals.api.triggerPaymentEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(RESPONDENT + HUB_PAGE);
    });

    it('saves and redirects to the pay your final order fee page if last payment was unsuccessful', async () => {
      const userCase = {
        state: State.AwaitingFinalOrderPayment,
        applicationType: ApplicationType.SOLE_APPLICATION,
        finalOrderPayments: [
          {
            id: 'mock payment id',
            value: {
              amount: 55000,
              channel: 'mock payment provider',
              created: '1999-12-31T20:01:00.123',
              feeCode: 'FEE0002',
              reference: 'mock ref',
              status: PaymentStatus.IN_PROGRESS,
              transactionId: 'mock payment id',
            },
          },
        ],
      };
      const req = mockRequest({
        userCase,
      });
      req.locals.api.triggerPaymentEvent = jest.fn().mockReturnValue(userCase) as any;
      const res = mockResponse();

      (mockGet as jest.Mock<(...args: any[]) => any>).mockReturnValueOnce({
        payment_id: 'mock payment id',
        status: 'Failed',
      });

      await paymentController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith('mock ref');

      expect(req.locals.api.triggerPaymentEvent).not.toHaveBeenCalled();

      expect(res.redirect).toHaveBeenCalledWith(RESPONDENT + PAY_YOUR_FINAL_ORDER_FEE);
    });

    it('throws an error if the payment API is down', async () => {
      const userCase = {
        state: State.AwaitingFinalOrderPayment,
        applicationType: ApplicationType.JOINT_APPLICATION,
        finalOrderPayments: [
          {
            id: 'mock payment id',
            value: {
              amount: 55000,
              channel: 'mock payment provider',
              created: '1999-12-31T20:01:00.123',
              feeCode: 'FEE0002',
              reference: 'mock ref',
              status: PaymentStatus.IN_PROGRESS,
              transactionId: 'mock payment id',
            },
          },
        ],
      };
      const req = mockRequest({
        userCase,
      });
      req.locals.api.triggerPaymentEvent = jest.fn().mockReturnValue(userCase) as any;
      const res = mockResponse();

      (mockGet as jest.Mock<(...args: any[]) => any>).mockReturnValueOnce(undefined);

      await expect(paymentController.get(req, res)).rejects.toThrow(
        new Error('Could not retrieve payment status from payment service')
      );

      expect(mockGet).toHaveBeenCalledWith('mock ref');
    });

    it('saves and redirects to the pay and submit page if last payment was unsuccessful and is joint application', async () => {
      const userCase = {
        state: State.AwaitingFinalOrderPayment,
        applicationType: ApplicationType.SOLE_APPLICATION,
        finalOrderPayments: [
          {
            id: 'mock payment id',
            value: {
              amount: 55000,
              channel: 'mock payment provider',
              created: '1999-12-31T20:01:00.123',
              feeCode: 'FEE0002',
              reference: 'mock ref',
              status: PaymentStatus.IN_PROGRESS,
              transactionId: 'mock payment id',
            },
          },
        ],
      };
      const req = mockRequest({
        userCase,
      });
      req.locals.api.triggerPaymentEvent = jest.fn().mockReturnValue(userCase) as any;
      const res = mockResponse();

      (mockGet as jest.Mock<(...args: any[]) => any>).mockReturnValueOnce({
        payment_id: 'mock payment id',
        status: 'Failed',
      });

      await paymentController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith('mock ref');

      expect(req.locals.api.triggerPaymentEvent).not.toHaveBeenCalled();

      expect(res.redirect).toHaveBeenCalledWith(RESPONDENT + PAY_YOUR_FINAL_ORDER_FEE);
    });
  });
});
/* eslint-disable @typescript-eslint/no-explicit-any */
