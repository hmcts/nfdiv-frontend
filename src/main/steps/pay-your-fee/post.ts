import autobind from 'autobind-decorator';
import config from 'config';
import dayjs from 'dayjs';
import { Response } from 'express';

import { CITIZEN_SUBMIT, PaymentStatus, State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { PaymentClient } from '../../app/payment/PaymentClient';
import { PaymentModel } from '../../app/payment/PaymentModel';
import { PAYMENT_CALLBACK_URL } from '../urls';

@autobind
export default class PaymentPostController {
  public async post(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.AwaitingPayment) {
      req.session.userCase = await req.locals.api.triggerEvent(req.session.userCase.id, {}, CITIZEN_SUBMIT);
    }

    const payments = new PaymentModel(req.session.userCase.payments);
    if (payments.hasPayment && payments.lastPayment.paymentStatus === PaymentStatus.IN_PROGRESS) {
      if (payments.lastPayment.paymentReference) {
        return this.saveAndRedirect(req, res, PAYMENT_CALLBACK_URL);
      }
      payments.update(payments.lastPayment.paymentTransactionId, { paymentStatus: PaymentStatus.TIMED_OUT });
    }

    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    const paymentClient = new PaymentClient(req.session, returnUrl);

    const { applicationFeeOrderSummary } = req.session.userCase;
    const payment = await paymentClient.create();
    payments.add({
      paymentDate: dayjs(payment?.date_created).format('YYYY-MM-DD'),
      paymentFeeId: applicationFeeOrderSummary.Fees[0].value.FeeCode,
      paymentAmount: parseInt(applicationFeeOrderSummary.Fees[0].value.FeeAmount, 10),
      paymentSiteId: config.get('services.payments.siteId'),
      paymentStatus: PaymentStatus.IN_PROGRESS,
      paymentChannel: payment._links.next_url.href,
      paymentReference: payment.reference,
      paymentTransactionId: payment.external_reference,
    });

    req.session.userCase = await req.locals.api.addPayment(req.session.userCase.id, payments.list);

    this.saveAndRedirect(req, res, payment._links.next_url.href);
  }

  private saveAndRedirect(req: AppRequest, res: Response, url: string) {
    req.session.save(err => {
      if (err) {
        throw err;
      }

      res.redirect(url);
    });
  }
}
