import { ApplicationType, CITIZEN_PAYMENT_MADE, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import BasePaymentCallbackGetController from '../../../app/controller/BasePaymentCallbackGetController';
import { PaymentModel } from '../../../app/payment/PaymentModel';
import {
  APPLICATION_SUBMITTED,
  CHECK_ANSWERS_URL,
  JOINT_APPLICATION_SUBMITTED,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
} from '../../urls';

export default class PaymentCallbackGetController extends BasePaymentCallbackGetController {
  protected awaitingPaymentState(): State {
    return State.AwaitingPayment;
  }

  protected noPaymentRequiredUrl(): string {
    return CHECK_ANSWERS_URL;
  }

  protected paymentMadeUrl(): string {
    return CITIZEN_PAYMENT_MADE;
  }

  protected paymentSuccessUrl(req: AppRequest): string {
    return req.session.userCase.applicationType === ApplicationType.JOINT_APPLICATION
      ? JOINT_APPLICATION_SUBMITTED
      : APPLICATION_SUBMITTED;
  }

  protected paymentFailureUrl(req: AppRequest): string {
    return req.query.back
      ? CHECK_ANSWERS_URL
      : req.session.userCase.applicationType === ApplicationType.JOINT_APPLICATION
        ? PAY_AND_SUBMIT
        : PAY_YOUR_FEE;
  }

  protected getPayments(req: AppRequest): PaymentModel {
    return new PaymentModel(req.session.userCase.payments);
  }
}
