import autobind from 'autobind-decorator';

import { CaseData, OrderSummary, RESPONDENT_APPLY_FOR_FINAL_ORDER, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import BasePaymentPostController from '../../../app/controller/BasePaymentPostController';
import { AnyObject } from '../../../app/controller/PostController';

@autobind
export default class FinalOrderPaymentPostController extends BasePaymentPostController {
  protected awaitingPaymentState(): State {
    return State.AwaitingFinalOrderPayment;
  }

  protected awaitingPaymentEvent(): string {
    return RESPONDENT_APPLY_FOR_FINAL_ORDER;
  }

  protected getOrderSummary(req: AppRequest<AnyObject>): OrderSummary {
    return req.session.userCase.applicant2FinalOrderFeeOrderSummary;
  }

  protected paymentsCaseField(): keyof CaseData {
    return 'finalOrderPayments' as keyof CaseData;
  }

  protected getResponsiblePartyName(req: AppRequest<AnyObject>): string | undefined {
    return req.session.userCase.applicant2FullNameOnCertificate;
  }

  protected getFeeDescription(req: AppRequest<AnyObject>): string {
    return 'Final Order application fee';
  }
}
