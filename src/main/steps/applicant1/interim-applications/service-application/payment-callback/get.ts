import { CITIZEN_SERVICE_PAYMENT_MADE, CaseData, SERVICE_PAYMENT_STATES } from '../../../../../app/case/definition.js';
import { AppRequest } from '../../../../../app/controller/AppRequest.js';
import BasePaymentCallbackGetController from '../../../../../app/controller/BasePaymentCallbackGetController.js';
import autobind from '../../../../../app/utils/autobind.js';
import { HUB_PAGE, PAY_YOUR_SERVICE_FEE, SERVICE_APPLICATION_SUBMITTED } from '../../../../urls.js';

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
