import { Logger } from '@hmcts/nodejs-logging';
import config from 'config';
import { Response } from 'express';

import { ApplicationType, CITIZEN_PAYMENT_MADE, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { PaymentClientV2 } from '../../../app/payment/PaymentClientV2';
import { PaymentModel } from '../../../app/payment/PaymentModel';
import {
  APPLICATION_SUBMITTED,
  CHECK_ANSWERS_URL,
  JOINT_APPLICATION_SUBMITTED,
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
} from '../../urls';

const logger = Logger.getLogger('payment');

export default class PaymentCallbackGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.AwaitingPayment) {
      logger.info('PaymentCallbackGetController: State is not awaiting payment');
      return res.redirect(CHECK_ANSWERS_URL);
    }
    logger.info('PaymentCallbackGetController 1');
    const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_CALLBACK_URL}`;

    const paymentClient = new PaymentClientV2(req.session, returnUrl);
    const payments = new PaymentModel(req.session.userCase.payments);
    logger.info('PaymentCallbackGetController 2');
    if (!payments.hasPayment) {
      logger.info('PaymentCallbackGetController: no payments : redirecting');
      return res.redirect(CHECK_ANSWERS_URL);
    }
    logger.info('PaymentCallbackGetController 3');
    const lastPaymentAttempt = payments.lastPayment;
    logger.info(lastPaymentAttempt);
    const payment = await paymentClient.get(lastPaymentAttempt.reference);

    if (!payment) {
      throw new Error('Could not retrieve payment status from payment service');
    }
    logger.info('PaymentCallbackGetController 4');
    if (payment?.status === 'Initiated') {
      logger.info(
        'PaymentCallbackGetController: Payment status initiated: redirecting to: ' + lastPaymentAttempt.channel
      );
      return res.redirect(lastPaymentAttempt.channel);
    }
    logger.info('PaymentCallbackGetController 5');
    payments.setStatus(lastPaymentAttempt.transactionId, payment?.status);

    if (payments.wasLastPaymentSuccessful) {
      logger.info('PaymentCallbackGetController 6');
      req.session.userCase = await req.locals.api.triggerPaymentEvent(
        req.session.userCase.id,
        payments.list,
        CITIZEN_PAYMENT_MADE
      );
    }
    logger.info('PaymentCallbackGetController 7');
    req.session.save(() => {
      if (payments.wasLastPaymentSuccessful) {
        return req.session.userCase.applicationType === ApplicationType.JOINT_APPLICATION
          ? res.redirect(JOINT_APPLICATION_SUBMITTED)
          : res.redirect(APPLICATION_SUBMITTED);
      }
      logger.info('PaymentCallbackGetController 8');
      res.redirect(
        req.query.back
          ? CHECK_ANSWERS_URL
          : req.session.userCase.applicationType === ApplicationType.JOINT_APPLICATION
            ? PAY_AND_SUBMIT
            : PAY_YOUR_FEE
      );
    });
  }
}
