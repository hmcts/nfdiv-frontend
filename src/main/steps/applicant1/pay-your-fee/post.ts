import { APPLICATION_PAYMENT_STATES, CITIZEN_SUBMIT, CaseData, Fee, ListValue } from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import BasePaymentPostController from '../../../app/controller/BasePaymentPostController.js';
import { AnyObject } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';
import { PAYMENT_CALLBACK_URL } from '../../../steps/urls.js';

@autobind
export default class PaymentPostController extends BasePaymentPostController {
  protected readyForPayment(req: AppRequest<AnyObject>): boolean {
    return APPLICATION_PAYMENT_STATES.has(req.session.userCase.state);
  }

  protected awaitingPaymentEvent(): string {
    return CITIZEN_SUBMIT;
  }

  protected getFeesFromOrderSummary(req: AppRequest<AnyObject>): ListValue<Fee>[] {
    return req.session.userCase.applicationFeeOrderSummary.Fees;
  }

  protected paymentsCaseField(): keyof CaseData {
    return 'applicationPayments' as keyof CaseData;
  }

  protected getServiceReferenceForFee(req: AppRequest<AnyObject>): string {
    return req.session.userCase.applicationFeeServiceRequestReference;
  }

  protected getPaymentCallbackPath(): string {
    return PAYMENT_CALLBACK_URL;
  }
}
