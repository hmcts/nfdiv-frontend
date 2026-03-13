import autobind from 'autobind-decorator';

import BaseGeneralApplicationPaymentPostController from '../../../../applicant1/interim-applications/common/general-application/pay-your-fee/post';
import { GENERAL_APPLICATION_PAYMENT_CALLBACK, APPLICANT_2 } from '../../../../urls';

@autobind
export default class GeneralApplicationPaymentPostController extends BaseGeneralApplicationPaymentPostController {
  protected getPaymentCallbackPath(): string {
    return APPLICANT_2 + GENERAL_APPLICATION_PAYMENT_CALLBACK;
  }
}
