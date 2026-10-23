import {
  APPLICATION_PAYMENT_STATES,
  ApplicationType,
  CITIZEN_PAYMENT_MADE,
  CaseData,
} from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import BasePaymentCallbackGetController from '../../../app/controller/BasePaymentCallbackGetController.js';
import autobind from '../../../app/utils/autobind.js';
import {
  APPLICATION_SUBMITTED,
  CHECK_ANSWERS_URL,
  JOINT_APPLICATION_SUBMITTED,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
} from '../../urls.js';

@autobind
export default class PaymentCallbackGetController extends BasePaymentCallbackGetController {
  protected isAwaitingPayment(req: AppRequest): boolean {
    return APPLICATION_PAYMENT_STATES.has(req.session.userCase.state);
  }

  protected noPaymentRequiredUrl(): string {
    return CHECK_ANSWERS_URL;
  }

  protected paymentMadeEvent(): string {
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

  protected paymentsCaseField(): keyof CaseData {
    return 'applicationPayments' as keyof CaseData;
  }
}
