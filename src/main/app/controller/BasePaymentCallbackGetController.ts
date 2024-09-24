import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { CaseData, State } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { PaymentClient } from '../payment/PaymentClient';
import { PaymentModel } from '../payment/PaymentModel';

import { getPaymentCallbackPath } from './BasePaymentPostController';

const logger = Logger.getLogger('payment');

@autobind
export default abstract class BasePaymentCallbackGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== this.awaitingPaymentState()) {
      return res.redirect(this.noPaymentRequiredUrl(req));
    }
    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${getPaymentCallbackPath(req)}`;

    const paymentClient = new PaymentClient(req.session, returnUrl);

    const payments = new PaymentModel(req.session.userCase[this.paymentsCaseField()] || []);
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
      const eventPayload = { [this.paymentsCaseField()]: payments.list };

      req.session.userCase = await req.locals.api.triggerPaymentEvent(
        req.session.userCase.id,
        eventPayload,
        this.paymentMadeEvent(req)
      );
    }

    req.session.save(() => {
      if (payments.wasLastPaymentSuccessful) {
        res.redirect(this.paymentSuccessUrl(req));
      }

      res.redirect(this.paymentFailureUrl(req));
    });
  }

  protected abstract awaitingPaymentState(): State;
  protected abstract noPaymentRequiredUrl(req: AppRequest): string;
  protected abstract paymentMadeEvent(req: AppRequest): string;
  protected abstract paymentSuccessUrl(req: AppRequest): string;
  protected abstract paymentFailureUrl(req: AppRequest): string;
  protected abstract paymentsCaseField(): keyof CaseData;
}
