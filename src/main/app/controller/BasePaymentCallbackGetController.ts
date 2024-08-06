import { Logger } from '@hmcts/nodejs-logging';
import config from 'config';
import { Response } from 'express';

import { State } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { PaymentClient } from '../payment/PaymentClient';
import { PaymentModel } from '../payment/PaymentModel';
import { PAYMENT_CALLBACK_URL } from '../../steps/urls';

const logger = Logger.getLogger('payment');

export default abstract class BasePaymentCallbackGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.AwaitingPayment) {
      return res.redirect(this.noPaymentRequiredUrl(req));
    }
    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    const paymentClient = new PaymentClient(req.session, returnUrl);
    
    const payments = this.getPayments(req)
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
      req.session.userCase = await req.locals.api.triggerPaymentEvent(
        req.session.userCase.id,
        payments.list,
        this.paymentMadeUrl(req)
      );
    }
    req.session.save(() => {
      if (payments.wasLastPaymentSuccessful) {
        res.redirect(this.paymentSuccessfulUrl(req));
      }

      res.redirect(this.paymentFailedUrl(req));
    });
  }

  protected abstract noPaymentRequiredUrl(req: AppRequest): string;
  protected abstract paymentMadeUrl(req: AppRequest): string;
  protected abstract paymentSuccessfulUrl(req: AppRequest): string;
  protected abstract paymentFailedUrl(req: AppRequest): string;
  protected abstract getPayments(req: AppRequest): PaymentModel;
}
