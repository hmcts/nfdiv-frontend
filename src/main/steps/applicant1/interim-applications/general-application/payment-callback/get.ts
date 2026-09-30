import {
  CITIZEN_GENERAL_APPLICATION_PAYMENT_MADE,
  CaseData,
  GENERAL_APPLICATION_PAYMENT_STATES,
} from '../../../../../app/case/definition.js';
import { AppRequest } from '../../../../../app/controller/AppRequest.js';
import BasePaymentCallbackGetController from '../../../../../app/controller/BasePaymentCallbackGetController.js';
import { AnyObject } from '../../../../../app/controller/PostController.js';
import autobind from '../../../../../app/utils/autobind.js';
import {
  findUnpaidGeneralApplication,
  getGeneralApplicationPaymentsField,
  getGeneralApplicationServiceRequest,
} from '../../../../../app/utils/general-application-utils.js';
import { GENERAL_APPLICATION_SUBMITTED, HUB_PAGE, PAY_YOUR_GENERAL_APPLICATION_FEE } from '../../../../urls.js';

@autobind
export default class GeneralApplicationPaymentCallbackGetController extends BasePaymentCallbackGetController {
  protected isAwaitingPayment(req: AppRequest): boolean {
    const serviceRequest = getGeneralApplicationServiceRequest(req);

    return (
      GENERAL_APPLICATION_PAYMENT_STATES.has(req.session.userCase.state) &&
      findUnpaidGeneralApplication(req.session.userCase, serviceRequest) !== undefined
    );
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

  protected paymentsCaseField(req: AppRequest<AnyObject>): keyof CaseData {
    return getGeneralApplicationPaymentsField(req) as keyof CaseData;
  }
}
