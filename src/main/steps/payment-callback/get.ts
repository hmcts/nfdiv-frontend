import config from 'config';
import { Response } from 'express';

import { State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { PaymentClient } from '../../app/payment/PaymentClient';
import { PaymentModel } from '../../app/payment/PaymentModel';
import { APPLICATION_SUBMITTED, CHECK_ANSWERS_URL, PAYMENT_CALLBACK_URL, PAY_YOUR_FEE } from '../../steps/urls';

export default class PaymentCallbackGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.AwaitingPayment) {
      return res.redirect(CHECK_ANSWERS_URL);
    }

    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    const paymentClient = new PaymentClient(req.session, returnUrl);
    const payments = new PaymentModel(req.session.userCase.payments);

    if (!payments.hasPayment) {
      return res.redirect(CHECK_ANSWERS_URL);
    }

    const lastPaymentAttempt = payments.lastPayment;
    const payment = await paymentClient.get(lastPaymentAttempt.paymentReference);

    if (payment?.status === 'Initiated') {
      return res.redirect(lastPaymentAttempt.paymentChannel);
    }

    payments.setStatus(lastPaymentAttempt.paymentTransactionId, payment?.status);

    req.session.userCase = await req.locals.api.addPayment(req.session.userCase.id, payments.list);

    req.session.save(() => res.redirect(payments.wasLastPaymentSuccessful ? APPLICATION_SUBMITTED : PAY_YOUR_FEE));
  }
}
