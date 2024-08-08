import autobind from 'autobind-decorator';

import { CaseData, CITIZEN_SUBMIT, Fee, ListValue, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import BasePaymentPostController from '../../../app/controller/BasePaymentPostController';
import { AnyObject } from '../../../app/controller/PostController';

@autobind
export default class PaymentPostController extends BasePaymentPostController {
  protected awaitingPaymentState(): State {
    return State.AwaitingPayment;
  }

  protected awaitingPaymentEvent(): string {
    return CITIZEN_SUBMIT;
  }

  protected getFeesFromOrderSummary(req: AppRequest<AnyObject>): ListValue<Fee>[] {
    return req.session.userCase.applicationFeeOrderSummary.Fees;
  }

  protected paymentsCaseField(): keyof CaseData {
    return "payments" as keyof CaseData;
  }

  protected getResponsiblePartyName(req: AppRequest<AnyObject>): string | undefined {
    return req.session.userCase.applicant1FullNameOnCertificate;
  }
}
