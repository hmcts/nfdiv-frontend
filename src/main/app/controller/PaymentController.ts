import config from 'config';
import dayjs from 'dayjs';
import { Response } from 'express';

import { APPLICATION_SUBMITTED, HOME_URL, PAYMENT_CALLBACK_URL, PAY_YOUR_FEE } from '../../steps/urls';
import { CITIZEN_ADD_PAYMENT, CITIZEN_SUBMIT, PaymentStatus, State } from '../case/definition';
import { PaymentClient } from '../payment/PaymentClient';
import { PaymentModel } from '../payment/PaymentModel';

import { AppRequest } from './AppRequest';

export class PaymentController {
  public async payment(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.Draft) {
      return res.redirect(HOME_URL);
    }

    const paymentClient = this.getPaymentClient(req, res);

    req.session.userCase = await req.locals.api.triggerEvent(req.session.userCase.id, {}, CITIZEN_SUBMIT);
    const payments = new PaymentModel(req.session.userCase.payments);

    const { applicationFeeOrderSummary } = req.session.userCase;
    const payment = await paymentClient.create();
    payments.add({
      paymentDate: dayjs(payment?.date_created).format('YYYY-MM-DD'),
      paymentFeeId: applicationFeeOrderSummary.Fees[0].value.FeeCode,
      paymentAmount: parseInt(applicationFeeOrderSummary.Fees[0].value.FeeAmount, 10),
      paymentSiteId: config.get('services.payments.siteId'),
      paymentStatus: PaymentStatus.IN_PROGRESS,
      paymentChannel: 'HMCTS Pay',
      paymentReference: payment.reference,
      paymentTransactionId: payment.external_reference,
    });
    req.session.userCase.payments = payments.list;

    req.session.save(err => {
      if (err) {
        throw err;
      }

      res.redirect(payment._links.next_url.href);
    });
  }

  public async callback(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.AwaitingPayment) {
      return res.redirect(HOME_URL);
    }

    const paymentClient = this.getPaymentClient(req, res);
    const payments = new PaymentModel(req.session.userCase.payments);

    if (!payments.hasPayment) {
      return res.redirect(HOME_URL);
    }

    const lastPaymentAttempt = payments.lastPayment;
    const payment = await paymentClient.get(lastPaymentAttempt.paymentReference);

    payments.setStatus(lastPaymentAttempt.paymentTransactionId, payment?.status);

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { payments: payments.list },
      CITIZEN_ADD_PAYMENT
    );

    req.session.save(() => res.redirect(payments.wasLastPaymentSuccessful ? APPLICATION_SUBMITTED : PAY_YOUR_FEE));
  }

  private getPaymentClient(req: AppRequest, res: Response) {
    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    return new PaymentClient(req.session, returnUrl);
  }
}
