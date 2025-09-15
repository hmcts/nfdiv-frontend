import autobind from 'autobind-decorator';

import { CITIZEN_SERVICE_PAYMENT_MADE, CaseData, SERVICE_PAYMENT_STATES } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import BasePaymentCallbackGetController from '../../../../app/controller/BasePaymentCallbackGetController';
import { HUB_PAGE, PAY_YOUR_SERVICE_FEE, SERVICE_APPLICATION_SUBMITTED } from '../../../urls';

@autobind
export default class ServiceApplicationPaymentCallbackGetController extends BasePaymentCallbackGetController {
  protected isAwaitingPayment(req: AppRequest): boolean {
    return SERVICE_PAYMENT_STATES.has(req.session.userCase.state);
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
