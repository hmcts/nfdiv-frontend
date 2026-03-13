import autobind from 'autobind-decorator';

import { GENERAL_APPLICATION_SUBMITTED, HUB_PAGE, PAY_YOUR_GENERAL_APPLICATION_FEE } from '../../../../urls';
import BaseGeneralApplicationPaymentCallbackGetController from '../../common/general-application/payment-callback/get';


@autobind
export default class GeneralApplicationPaymentCallbackGetController extends BaseGeneralApplicationPaymentCallbackGetController {
  protected noPaymentRequiredUrl(): string {
    return HUB_PAGE;
  }

  protected paymentSuccessUrl(): string {
    return GENERAL_APPLICATION_SUBMITTED;
  }

  protected paymentFailureUrl(): string {
    return PAY_YOUR_GENERAL_APPLICATION_FEE;
  }
}
