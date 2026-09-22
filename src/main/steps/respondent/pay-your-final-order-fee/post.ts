import {
  CaseData,
  FINAL_ORDER_PAYMENT_STATES,
  Fee,
  ListValue,
  RESPONDENT_APPLY_FOR_FINAL_ORDER,
} from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import BasePaymentPostController from '../../../app/controller/BasePaymentPostController.js';
import { AnyObject } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';
import { PAYMENT_CALLBACK_URL, RESPONDENT } from '../../../steps/urls.js';

@autobind
export default class FinalOrderPaymentPostController extends BasePaymentPostController {
  protected readyForPayment(req: AppRequest<AnyObject>): boolean {
    return FINAL_ORDER_PAYMENT_STATES.has(req.session.userCase.state);
  }

  protected awaitingPaymentEvent(): string {
    return RESPONDENT_APPLY_FOR_FINAL_ORDER;
  }

  protected getFeesFromOrderSummary(req: AppRequest<AnyObject>): ListValue<Fee>[] {
    return req.session.userCase.applicant2FinalOrderFeeOrderSummary.Fees;
  }

  protected paymentsCaseField(): keyof CaseData {
    return 'finalOrderPayments' as keyof CaseData;
  }

  protected getServiceReferenceForFee(req: AppRequest<AnyObject>): string {
    return req.session.userCase.applicant2FinalOrderFeeServiceRequestReference;
  }

  protected getPaymentCallbackPath(): string {
    return RESPONDENT + PAYMENT_CALLBACK_URL;
  }
}
