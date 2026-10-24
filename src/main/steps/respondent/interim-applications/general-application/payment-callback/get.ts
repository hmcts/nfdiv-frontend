import autobind from 'autobind-decorator';

import BaseGeneralApplicationPaymentCallbackGetController from '../../../../applicant1/interim-applications/common/general-application/payment-callback/get';
import {
  GENERAL_APPLICATION_SUBMITTED,
  HUB_PAGE,
  PAY_YOUR_GENERAL_APPLICATION_FEE,
  RESPONDENT,
} from '../../../../urls';

@autobind
export default class GeneralApplicationPaymentCallbackGetController extends BaseGeneralApplicationPaymentCallbackGetController {
  protected noPaymentRequiredUrl(): string {
    return RESPONDENT + HUB_PAGE;
  }

  protected paymentSuccessUrl(): string {
    return RESPONDENT + GENERAL_APPLICATION_SUBMITTED;
  }

  protected paymentFailureUrl(): string {
    return RESPONDENT + PAY_YOUR_GENERAL_APPLICATION_FEE;
  }
}
