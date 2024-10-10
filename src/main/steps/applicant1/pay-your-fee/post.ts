import autobind from 'autobind-decorator';

import { CITIZEN_SUBMIT, CaseData, Fee, ListValue, State } from '../../../app/case/definition';
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
    return 'applicationPayments' as keyof CaseData;
  }

  protected getServiceReferenceForFee(req: AppRequest<AnyObject>): string {
    return req.session.userCase.applicationFeeServiceRequestReference;
  }
}
