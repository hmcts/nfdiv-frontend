import autobind from 'autobind-decorator';

import {
  CaseData,
  FINAL_ORDER_PAYMENT_STATES,
  Fee,
  ListValue,
  RESPONDENT_APPLY_FOR_FINAL_ORDER,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import BasePaymentPostController from '../../../app/controller/BasePaymentPostController';
import { AnyObject } from '../../../app/controller/PostController';
import { PAYMENT_CALLBACK_URL, RESPONDENT } from '../../../steps/urls';

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

  protected paymentsCaseField(req: AppRequest<AnyObject>): keyof CaseData {
    return 'finalOrderPayments' as keyof CaseData;
  }

  protected getServiceReferenceForFee(req: AppRequest<AnyObject>): string {
    return req.session.userCase.applicant2FinalOrderFeeServiceRequestReference;
  }

  protected getPaymentCallbackPath(): string {
    return RESPONDENT + PAYMENT_CALLBACK_URL;
  }
}
