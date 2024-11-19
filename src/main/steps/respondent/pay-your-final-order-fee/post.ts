import autobind from 'autobind-decorator';

import { CaseData, Fee, ListValue, FINAL_ORDER_PAYMENT_STATES, RESPONDENT_APPLY_FOR_FINAL_ORDER, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import BasePaymentPostController from '../../../app/controller/BasePaymentPostController';
import { AnyObject } from '../../../app/controller/PostController';

@autobind
export default class FinalOrderPaymentPostController extends BasePaymentPostController {
  protected awaitingPaymentStates(): Set<State> {
    return FINAL_ORDER_PAYMENT_STATES;
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
}
