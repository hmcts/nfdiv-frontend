import autobind from 'autobind-decorator';

import BaseGeneralApplicationPaymentCallbackGetController from '../../../../applicant1/interim-applications/common/general-application/payment-callback/get';
import {
  APPLICANT_2,
  GENERAL_APPLICATION_SUBMITTED,
  HUB_PAGE,
  PAY_YOUR_GENERAL_APPLICATION_FEE,
} from '../../../../urls';

@autobind
export default class GeneralApplicationPaymentCallbackGetController extends BaseGeneralApplicationPaymentCallbackGetController {
  protected noPaymentRequiredUrl(): string {
    return APPLICANT_2 + HUB_PAGE;
  }

  protected paymentSuccessUrl(): string {
    return APPLICANT_2 + GENERAL_APPLICATION_SUBMITTED;
  }

  protected paymentFailureUrl(): string {
    return APPLICANT_2 + PAY_YOUR_GENERAL_APPLICATION_FEE;
  }
}
