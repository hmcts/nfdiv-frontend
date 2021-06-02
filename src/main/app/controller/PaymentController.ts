import config from 'config';
import dayjs from 'dayjs';
import { Response } from 'express';

import { APPLICATION_SUBMITTED, HOME_URL, PAYMENT_CALLBACK_URL } from '../../steps/urls';
import { CITIZEN_ADD_PAYMENT, CITIZEN_SUBMIT, State } from '../case/definition';
import { PaymentClient } from '../payment/PaymentClient';
import { PaymentModel } from '../payment/PaymentModel';

import { AppRequest } from './AppRequest';

export class PaymentController {
  public async payment(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.Draft) {
      return res.redirect(HOME_URL);
    }

    const { paymentClient, payments } = this.setupPaymentClientModel(req, res);

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { payments: payments.list },
      CITIZEN_SUBMIT
    );

    const payment = await paymentClient.create();
    payments.add({
      paymentDate: dayjs(payment.dateCreated).format('YYYY-MM-DD'), // @TODO this seems to only accept a date without time
      paymentFeeId: payment.fees[0].code,
      paymentAmount: payment.fees[0].calculatedAmount,
      paymentSiteId: payment.siteId,
      paymentStatus: payment.status,
      paymentChannel: payment.channel,
      paymentReference: payment.reference,
      paymentTransactionId: payment.customerReference,
    });

    req.session.save(err => {
      if (err) {
        throw err;
      }

      if (!payment._links?.nextUrl.href) {
        throw new Error('Failed to create new payment');
      }

      res.redirect(payment._links.nextUrl.href);
    });
  }

  public async callback(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.AwaitingPayment) {
      return res.redirect(HOME_URL);
    }

    const { paymentClient, payments } = this.setupPaymentClientModel(req, res);

    if (!payments.hasPayment) {
      return res.redirect(HOME_URL);
    }

    const lastPaymentAttempt = payments.lastPayment;
    const payment = await paymentClient.get(lastPaymentAttempt.paymentTransactionId);

    // @TODO check these statuses actually exist
    if (['created', 'started'].includes(payment.status) && payment._links?.nextUrl.href) {
      return res.redirect(payment._links.nextUrl.href);
    }

    payments.setStatus(payment.customerReference, payment.statusHistories[payment.statusHistories.length - 1]);

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { payments: payments.list },
      CITIZEN_ADD_PAYMENT
    );

    req.session.save(() => res.redirect(payments.wasLastPaymentSuccessful ? APPLICATION_SUBMITTED : HOME_URL));
  }

  private setupPaymentClientModel(req: AppRequest, res: Response) {
    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    const paymentClient = new PaymentClient(req.session, returnUrl);
    const payments = new PaymentModel(req.session.userCase.payments);

    return { paymentClient, payments };
  }
}
