import config from 'config';
import dayjs from 'dayjs';
import { Response } from 'express';

import { APPLICATION_SUBMITTED, HOME_URL, PAYMENT_CALLBACK_URL } from '../../steps/urls';
import { CITIZEN_ADD_PAYMENT, CITIZEN_SUBMIT, PaymentStatus, State } from '../case/definition';
import { PaymentClient } from '../payment/PaymentClient';
import { PaymentModel, PaymentState } from '../payment/PaymentModel';

import { AppRequest } from './AppRequest';

export class PaymentController {
  public async payment(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state === State.Submitted) {
      return res.redirect(APPLICATION_SUBMITTED);
    }

    const { paymentClient, payments, event } = this.setup(req, res);

    const govPayment = await paymentClient.create();
    payments.add({
      paymentDate: dayjs(govPayment.created_date).format('YYYY-MM-DD'), // @TODO this seems to only accept a date without time
      paymentFeeId: 'FEE0002', // @TODO we should get this from the case API (when it returns one)
      paymentAmount: 55000,
      paymentSiteId: 'GOV Pay',
      paymentStatus: PaymentStatus.IN_PROGRESS,
      paymentChannel: govPayment.payment_provider,
      paymentReference: govPayment.reference,
      paymentTransactionId: govPayment.payment_id,
    });

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { payments: payments.list },
      event
    );

    req.session.save(err => {
      if (err) {
        throw err;
      }

      if (!govPayment._links?.next_url.href) {
        throw new Error('Failed to create new payment');
      }

      res.redirect(govPayment._links.next_url.href);
    });
  }

  public async callback(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state === State.Submitted) {
      return res.redirect(APPLICATION_SUBMITTED);
    }

    const { paymentClient, payments, event } = this.setup(req, res);

    if (!payments.hasPayment) {
      res.redirect(HOME_URL);
      return;
    }

    const lastPaymentAttempt = payments.lastPayment;
    const govPayment = await paymentClient.get(lastPaymentAttempt.paymentTransactionId);

    if (['created', 'started'].includes(govPayment.state.status) && govPayment._links?.next_url.href) {
      return res.redirect(govPayment._links.next_url.href);
    }

    payments.setStatus(govPayment.payment_id, govPayment.state as PaymentState);

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { payments: payments.list },
      event
    );

    req.session.save(() => res.redirect(payments.wasLastPaymentSuccessful ? APPLICATION_SUBMITTED : HOME_URL));
  }

  private setup(req: AppRequest, res: Response) {
    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    const paymentClient = new PaymentClient(req.session, returnUrl);
    const payments = new PaymentModel(req.session.userCase.payments);
    const event = req.session.userCase.state === State.Draft ? CITIZEN_SUBMIT : CITIZEN_ADD_PAYMENT;

    return { paymentClient, payments, event };
  }
}
