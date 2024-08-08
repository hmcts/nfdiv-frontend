import autobind from 'autobind-decorator';

import { CaseData, RESPONDENT_APPLY_FOR_FINAL_ORDER, Fee, ListValue, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import BasePaymentPostController from '../../../app/controller/BasePaymentPostController';
import { AnyObject } from '../../../app/controller/PostController';

@autobind
export default class FinalOrderPaymentPostController extends BasePaymentPostController {
  protected awaitingPaymentState(): State {
    return State.AwaitingRespondentFOPayment;
  }

  protected awaitingPaymentEvent(): string {
    return RESPONDENT_APPLY_FOR_FINAL_ORDER;
  }

  protected getFeesFromOrderSummary(req: AppRequest<AnyObject>): ListValue<Fee>[] {
    return req.session.userCase.applicant2FinalOrderFeeOrderSummary.Fees;
  }

  protected paymentsCaseField(): keyof CaseData {
    return "finalOrderPayments" as keyof CaseData;
  }

  protected getResponsiblePartyName(req: AppRequest<AnyObject>): string | undefined {
    return req.session.userCase.applicant2FullNameOnCertificate;
  }
}
