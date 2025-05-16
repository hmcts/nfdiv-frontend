import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { CaseWithId } from '../../app/case/case';
import { SAVE_AND_SIGN_OUT } from '../../steps/urls';
import {
  CITIZEN_ADD_PAYMENT,
  CITIZEN_CREATE_SERVICE_REQUEST,
  CaseData,
  Fee,
  ListValue,
  PaymentStatus,
} from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';
import { Payment, PaymentClient } from '../payment/PaymentClient';
import { PaymentModel } from '../payment/PaymentModel';

@autobind
export default abstract class BasePaymentPostController {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (req.body.saveAndSignOut || req.body.saveBeforeSessionTimeout) {
      return res.redirect(SAVE_AND_SIGN_OUT);
    }

    const citizenPaymentCallbackUrl: string = getPaymentCallbackUrl(req, res, this.getPaymentCallbackPath());

    if (!this.readyForPayment(req.session.userCase)) {
      req.session.userCase = await req.locals.api.triggerEvent(
        req.session.userCase.id,
        { citizenPaymentCallbackUrl },
        this.awaitingPaymentEvent()
      );
    }

    const payments = new PaymentModel(req.session.userCase[this.paymentsCaseField()] || []);
    if (payments.isPaymentInProgress()) {
      return this.saveAndRedirect(req, res, this.getPaymentCallbackPath());
    }

    if (!this.getServiceReferenceForFee(req)) {
      req.session.userCase = await req.locals.api.triggerEvent(
        req.session.userCase.id,
        { citizenPaymentCallbackUrl },
        CITIZEN_CREATE_SERVICE_REQUEST
      );
    }

    const serviceReference = this.getServiceReferenceForFee(req);
    const payment = await this.attemptPayment(req, payments, serviceReference, citizenPaymentCallbackUrl);

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

  private async attemptPayment(
    req: AppRequest<AnyObject>,
    payments: PaymentModel,
    serviceReference: string,
    callbackUrl: string
  ): Promise<Payment> {
    const fees = this.getFeesFromOrderSummary(req);
    const fee = fees[0].value;
    const client = this.getPaymentClient(req, callbackUrl);
    const payment = await client.create(serviceReference, fees);
    const now = new Date().toISOString();

    const newPaymentWithId = {
      id: payment.external_reference,
      value: {
        created: now,
        updated: now,
        feeCode: fee.FeeCode,
        amount: parseInt(fee.FeeAmount, 10),
        status: PaymentStatus.IN_PROGRESS,
        channel: payment.next_url,
        reference: payment.payment_reference,
        transactionId: payment.external_reference,
        serviceRequestReference: serviceReference,
      },
    };

    const eventPayload = { [this.paymentsCaseField()]: [...payments.list, newPaymentWithId] };
    req.session.userCase = await req.locals.api.triggerPaymentEvent(
      req.session.userCase.id,
      eventPayload,
      CITIZEN_ADD_PAYMENT
    );

    return payment;
  }

  protected abstract readyForPayment(userCase: CaseWithId): boolean;
  protected abstract awaitingPaymentEvent(): string;
  protected abstract getFeesFromOrderSummary(req: AppRequest<AnyObject>): ListValue<Fee>[];
  protected abstract getServiceReferenceForFee(req: AppRequest<AnyObject>): string;
  protected abstract paymentsCaseField(): keyof CaseData;
  protected abstract getPaymentCallbackPath(): string;
}

export function getPaymentCallbackUrl(req: AppRequest, res: Response, callbackPath: string): string {
  const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
  const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
  return `${protocol}${res.locals.host}${port}${callbackPath}`;
}

