import autobind from 'autobind-decorator';

import { CaseData, CITIZEN_SERVICE_PAYMENT_MADE, SERVICE_PAYMENT_STATES } from '../../../../app/case/definition';
import { CaseWithId } from '../../../../app/case/case';
import BasePaymentCallbackGetController from '../../../../app/controller/BasePaymentCallbackGetController';
import { HUB_PAGE, PAY_YOUR_SERVICE_FEE, SERVICE_APPLICATION_SUBMITTED } from '../../../urls';

@autobind
export default class ServiceApplicationPaymentCallbackGetController extends BasePaymentCallbackGetController {
  protected isAwaitingPayment(userCase: CaseWithId): boolean {
    return SERVICE_PAYMENT_STATES.has(userCase.state);
  }

  protected noPaymentRequiredUrl(): string {
    return HUB_PAGE;
  }

  protected paymentMadeEvent(): string {
    return CITIZEN_SERVICE_PAYMENT_MADE;
  }

  protected paymentSuccessUrl(): string {
    return SERVICE_APPLICATION_SUBMITTED;
  }

  protected paymentFailureUrl(): string {
    return PAY_YOUR_SERVICE_FEE;
  }

  protected paymentsCaseField(): keyof CaseData {
    return 'servicePayments' as keyof CaseData;
  }
}
