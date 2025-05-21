import autobind from 'autobind-decorator';

import { CaseWithId } from '../../../app/case/case';
import { APPLICATION_PAYMENT_STATES, CITIZEN_SUBMIT, CaseData, Fee, ListValue } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import BasePaymentPostController from '../../../app/controller/BasePaymentPostController';
import { AnyObject } from '../../../app/controller/PostController';
import { PAYMENT_CALLBACK_URL } from '../../../steps/urls';

@autobind
export default class PaymentPostController extends BasePaymentPostController {
  protected readyForPayment(userCase: CaseWithId): boolean {
    return APPLICATION_PAYMENT_STATES.has(userCase.state);
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
