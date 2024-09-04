import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { PAYMENT_CALLBACK_URL, RESPONDENT, SAVE_AND_SIGN_OUT } from '../../steps/urls';
import {
  ApplicationType,
  CITIZEN_ADD_PAYMENT,
  CaseData,
  OrderSummary,
  PaymentStatus,
  ServiceRequestStatus,
  State,
} from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';
import { PaymentClient } from '../payment/PaymentClient';
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
        {},
        this.awaitingPaymentEvent()
      );
    }

    const payments = new PaymentModel(req.session.userCase[this.paymentsCaseField()] || []);
    if (payments.isPaymentInProgress()) {
      return this.saveAndRedirect(req, res, getPaymentCallbackUrl(req));
    }

    const paymentClient = this.getPaymentClient(req, res);

    const paymentRedirectUrl = await this.takePayment(req, paymentClient, payments);

    this.saveAndRedirect(req, res, paymentRedirectUrl);
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
    const returnUrl = `${protocol}${res.locals.host}${port}${getPaymentCallbackUrl(req)}`;

    return new PaymentClient(req.session, returnUrl);
  }

  private async takePayment(
    req: AppRequest<AnyObject>,
    client: PaymentClient,
    payments: PaymentModel
  ): Promise<string> {
    let payment;
    const orderSummary = this.getOrderSummary(req);
    const fee = orderSummary.Fees[0].value;
    const serviceRequestReference = await this.findServiceRequestReference(fee.FeeCode, client);
    const caseId = req.session.userCase.id?.toString();

    if (!serviceRequestReference) {
      logger.info(`Creating payment with a new service request for ${caseId}.`);
      payment = await client.createPaymentWithNewServiceRequest(this.getFeeDescription(req), orderSummary);
    } else {
      logger.info(`Reattempting payment with the same service request for ${caseId}.`);
      payment = await client.createPaymentForServiceRequest(serviceRequestReference, orderSummary.Fees);
    }

    const now = new Date().toISOString();
    const redirectUrl = payment.next_url ?? payment._links.next_url.href;
    payments.add({
      created: now,
      updated: now,
      feeCode: fee.FeeCode,
      amount: parseInt(fee.FeeAmount, 10),
      status: PaymentStatus.IN_PROGRESS,
      transactionId: payment.external_reference,
      channel: redirectUrl,
      reference: payment.payment_reference ?? payment.reference,
      serviceRequestReference: serviceRequestReference ?? payment.payment_group_reference,
    });

    const eventPayload = { [this.paymentsCaseField()]: payments.list };
    req.session.userCase = await req.locals.api.triggerPaymentEvent(
      req.session.userCase.id,
      eventPayload,
      CITIZEN_ADD_PAYMENT
    );

    return redirectUrl;
  }

  public async findServiceRequestReference(feeCode: string, client: PaymentClient): Promise<string | undefined> {
    const paymentGroups = await client.getCasePaymentGroups();

    const paymentGroupWithMatchingFee = paymentGroups.find(
      paymentGroup =>
        paymentGroup.fees.map(fee => fee.code).includes(feeCode) &&
        paymentGroup.service_request_status !== ServiceRequestStatus.PAID
    );

    return paymentGroupWithMatchingFee?.payment_group_reference;
  }

  protected abstract awaitingPaymentState(): State;
  protected abstract awaitingPaymentEvent(): string;
  protected abstract getOrderSummary(req: AppRequest<AnyObject>): OrderSummary;
  protected abstract paymentsCaseField(): keyof CaseData;
  protected abstract getResponsiblePartyName(req: AppRequest<AnyObject>): string | undefined;
  protected abstract getFeeDescription(req: AppRequest<AnyObject>): string;
}

export function getPaymentCallbackUrl(req: AppRequest): string {
  const isRespondent: boolean =
    req.session.isApplicant2 && req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION;

  return isRespondent ? RESPONDENT + PAYMENT_CALLBACK_URL : PAYMENT_CALLBACK_URL;
}
