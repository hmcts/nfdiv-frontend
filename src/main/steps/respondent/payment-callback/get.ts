import autobind from 'autobind-decorator';

import { CaseData, FINAL_ORDER_PAYMENT_MADE, FINAL_ORDER_PAYMENT_STATES, State } from '../../../app/case/definition';
import BasePaymentCallbackGetController from '../../../app/controller/BasePaymentCallbackGetController';
import { HUB_PAGE, PAY_YOUR_FINAL_ORDER_FEE, RESPONDENT } from '../../urls';

@autobind
export default class PaymentCallbackGetController extends BasePaymentCallbackGetController {
  protected awaitingPaymentStates(): Set<State> {
    return FINAL_ORDER_PAYMENT_STATES;
  }

  protected noPaymentRequiredUrl(): string {
    return RESPONDENT + HUB_PAGE;
  }

  protected paymentMadeEvent(): string {
    return FINAL_ORDER_PAYMENT_MADE;
  }

  protected paymentSuccessUrl(): string {
    return RESPONDENT + HUB_PAGE;
  }

  protected paymentFailureUrl(): string {
    return RESPONDENT + PAY_YOUR_FINAL_ORDER_FEE;
  }

  protected paymentsCaseField(): keyof CaseData {
    return 'finalOrderPayments' as keyof CaseData;
  }
}
