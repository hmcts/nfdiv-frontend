import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { CITIZEN_ADD_PAYMENT, CITIZEN_SUBMIT, PaymentStatus, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import { PaymentClient } from '../../../app/payment/PaymentClient';
import { PaymentModel } from '../../../app/payment/PaymentModel';
import { PAYMENT_CALLBACK_URL, SAVE_AND_SIGN_OUT } from '../../urls';

const logger = Logger.getLogger('payment');

@autobind
export default class PaymentPostController {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (req.body.saveAndSignOut || req.body.saveBeforeSessionTimeout) {
      return res.redirect(SAVE_AND_SIGN_OUT);
    }

    if (req.session.userCase.state !== State.AwaitingPayment) {
      req.session.userCase = await req.locals.api.triggerEvent(req.session.userCase.id, {}, CITIZEN_SUBMIT);
    }

    const payments = new PaymentModel(req.session.userCase.payments || []);
    if (payments.isPaymentInProgress()) {
      return this.saveAndRedirect(req, res, PAYMENT_CALLBACK_URL);
    }

    const fee = req.session.userCase.applicationFeeOrderSummary.Fees[0].value;
    const client = this.getPaymentClient(req, res);
    let serviceRefNumberForFee = payments.getServiceRefNumberForFee(fee.FeeCode);
    if (!serviceRefNumberForFee) {
      logger.info('Cannot find service reference number for fee code. creating one');
      const serviceReqResponse = await client.createServiceRequest();
      serviceRefNumberForFee = serviceReqResponse.service_request_reference;
    }
    //Take payment for service request reference
    const payment = await client.create(serviceRefNumberForFee); //send service req number to this call
    const now = new Date().toISOString();

    payments.add({
      created: now,
      updated: now,
      feeCode: fee.FeeCode,
      amount: parseInt(fee.FeeAmount, 10),
      status: PaymentStatus.IN_PROGRESS,
      channel: payment.next_url,
      reference: payment.payment_reference,
      transactionId: payment.external_reference,
      serviceRequestReference: serviceRefNumberForFee,
    });

    req.session.userCase = await req.locals.api.triggerPaymentEvent(
      req.session.userCase.id,
      payments.list,
      CITIZEN_ADD_PAYMENT
    );
    this.saveAndRedirect(req, res, payment.next_url);
  }

  private saveAndRedirect(req: AppRequest, res: Response, url: string) {
    req.session.save(err => {
      if (err) {
        throw err;
      }

      res.redirect(url);
    });
  }

  private getPaymentClient(req: AppRequest, res: Response) {
    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    return new PaymentClient(req.session, returnUrl);
  }
}
