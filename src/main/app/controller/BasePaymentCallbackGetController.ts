import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CaseData } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { PaymentClient } from '../payment/PaymentClient';
import { PaymentModel } from '../payment/PaymentModel';

const logger = Logger.getLogger('payment');

@autobind
export default abstract class BasePaymentCallbackGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!this.isAwaitingPayment(req)) {
      return res.redirect(this.noPaymentRequiredUrl(req));
    }

    const paymentClient = new PaymentClient(req.session, '');

    const payments = new PaymentModel(req.session.userCase[this.paymentsCaseField(req)] || []);
    if (!payments.hasPayment) {
      return res.redirect(this.noPaymentRequiredUrl(req));
    }
    const lastPaymentAttempt = payments.lastPayment;
    logger.info(lastPaymentAttempt);

    const payment = await paymentClient.get(lastPaymentAttempt.reference);
    if (!payment) {
      throw new Error('Could not retrieve payment status from payment service');
    }
    if (payment?.status === 'Initiated') {
      return res.redirect(lastPaymentAttempt.channel);
    }

    payments.setStatus(lastPaymentAttempt.transactionId, payment?.status);

    if (payments.wasLastPaymentSuccessful) {
      const eventPayload = { [this.paymentsCaseField(req)]: payments.list };

      req.session.userCase = await req.locals.api.triggerPaymentEvent(
        req.session.userCase.id,
        eventPayload,
        this.paymentMadeEvent(req)
      );
    }

    req.session.save(() => {
      const redirectUrl = payments.wasLastPaymentSuccessful ? this.paymentSuccessUrl(req) : this.paymentFailureUrl(req);

      res.redirect(redirectUrl);
    });
  }

  protected abstract isAwaitingPayment(req: AppRequest): boolean;
  protected abstract noPaymentRequiredUrl(req: AppRequest): string;
  protected abstract paymentMadeEvent(req: AppRequest): string;
  protected abstract paymentSuccessUrl(req: AppRequest): string;
  protected abstract paymentFailureUrl(req: AppRequest): string;
  protected abstract paymentsCaseField(req: AppRequest): keyof CaseData;
}
