import autobind from 'autobind-decorator';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { CITIZEN_GENERAL_APPLICATION_PAYMENT_MADE, CaseData, GENERAL_APPLICATION_PAYMENT_STATES } from '../../../../app/case/definition';
import BasePaymentCallbackGetController from '../../../../app/controller/BasePaymentCallbackGetController';
import { HUB_PAGE, PAY_YOUR_GENERAL_APPLICATION_FEE, GENERAL_APPLICATION_SUBMITTED } from '../../../urls';
import { generalApplicationServiceRequest } from '../../../../app/utils/general-application-utils';

@autobind
export default class GeneralApplicationPaymentCallbackGetController extends BasePaymentCallbackGetController {
  protected isAwaitingPayment(req: AppRequest): boolean {
    return GENERAL_APPLICATION_PAYMENT_STATES.has(req.session.userCase.state) &&
      generalApplicationServiceRequest(req) != null;
  }

  protected noPaymentRequiredUrl(): string {
    return HUB_PAGE;
  }

  protected paymentMadeEvent(): string {
    return CITIZEN_GENERAL_APPLICATION_PAYMENT_MADE;
  }

  protected paymentSuccessUrl(): string {
    return GENERAL_APPLICATION_SUBMITTED;
  }

  protected paymentFailureUrl(): string {
    return PAY_YOUR_GENERAL_APPLICATION_FEE;
  }

  protected paymentsCaseField(): keyof CaseData {
    return 'servicePayments' as keyof CaseData;
  }
}
