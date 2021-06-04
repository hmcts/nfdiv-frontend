import config from 'config';
import dayjs from 'dayjs';
import { Response } from 'express';

import { CITIZEN_SUBMIT, PaymentStatus, State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { PaymentClient } from '../../app/payment/PaymentClient';
import { PaymentModel } from '../../app/payment/PaymentModel';
import { HOME_URL, PAYMENT_CALLBACK_URL } from '../../steps/urls';

export class PaymentGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.Draft) {
      return res.redirect(HOME_URL);
    }

    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    const paymentClient = new PaymentClient(req.session, returnUrl);

    req.session.userCase = await req.locals.api.triggerEvent({
      caseId: req.session.userCase.id,
      eventName: CITIZEN_SUBMIT,
    });
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
}
