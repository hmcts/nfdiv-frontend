import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { PAYMENT_CALLBACK_URL, RESPONDENT, SAVE_AND_SIGN_OUT } from '../../steps/urls';
import {
  ApplicationType,
  CITIZEN_ADD_PAYMENT,
  CaseData,
  Fee,
  ListValue,
  PaymentStatus,
  State,
} from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';
import { Payment, PaymentClient } from '../payment/PaymentClient';
import { PaymentModel } from '../payment/PaymentModel';

const logger = Logger.getLogger('payment');

@autobind
export default abstract class BasePaymentPostController {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (req.body.saveAndSignOut || req.body.saveBeforeSessionTimeout) {
      return res.redirect(SAVE_AND_SIGN_OUT);
    }

    if (req.session.userCase.state !== this.awaitingPaymentState()) {
      req.session.userCase = await req.locals.api.triggerEvent(
        req.session.userCase.id,
        { citizenPaymentCallbackUrl: getPaymentCallbackUrl(req, res) },
        this.awaitingPaymentEvent()
      );
    }

    const payments = new PaymentModel(req.session.userCase[this.paymentsCaseField()] || []);

    if (payments.isPaymentInProgress()) {
      return this.saveAndRedirect(req, res, getPaymentCallbackPath(req));
    }

    const paymentClient = this.getPaymentClient(req, getPaymentCallbackUrl(req, res));
    const payment = await this.createServiceRefAndTakePayment(req, paymentClient, payments);

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

  private getPaymentClient(req: AppRequest, callbackUrl: string) {
    return new PaymentClient(req.session, callbackUrl);
  }

  private async createServiceRefAndTakePayment(
    req: AppRequest<AnyObject>,
    client: PaymentClient,
    payments: PaymentModel
  ): Promise<Payment> {
    const fee = this.getFeesFromOrderSummary(req)[0].value;

    let serviceRefNumberForFee = payments.getServiceRefNumberForFee(fee.FeeCode);
    if (!serviceRefNumberForFee) {
      logger.info('Cannot find service reference number for fee code. creating one');
      const serviceReqResponse = await client.createServiceRequest(
        this.getResponsiblePartyName(req),
        this.getFeesFromOrderSummary(req)
      );
      serviceRefNumberForFee = serviceReqResponse.service_request_reference;
    }

    //Take payment for service request reference
    const payment = await client.create(serviceRefNumberForFee, this.getFeesFromOrderSummary(req));
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

    const eventPayload = { [this.paymentsCaseField()]: payments.list };
    req.session.userCase = await req.locals.api.triggerPaymentEvent(
      req.session.userCase.id,
      eventPayload,
      CITIZEN_ADD_PAYMENT
    );

    return payment;
  }

  protected abstract awaitingPaymentState(): State;
  protected abstract awaitingPaymentEvent(): string;
  protected abstract getFeesFromOrderSummary(req: AppRequest<AnyObject>): ListValue<Fee>[];
  protected abstract paymentsCaseField(): keyof CaseData;
  protected abstract getResponsiblePartyName(req: AppRequest<AnyObject>): string | undefined;
}

export function getPaymentCallbackUrl(req: AppRequest, res: Response): string {
  const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
  const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
  return `${protocol}${res.locals.host}${port}${getPaymentCallbackPath(req)}`;
}

export function getPaymentCallbackPath(req: AppRequest): string {
  const isRespondent: boolean =
    req.session.isApplicant2 && req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION;

  return isRespondent ? RESPONDENT + PAYMENT_CALLBACK_URL : PAYMENT_CALLBACK_URL;
}
