import autobind from 'autobind-decorator';

import BaseGeneralApplicationPaymentPostController from '../../../../applicant1/interim-applications/common/general-application/pay-your-fee/post';
import { GENERAL_APPLICATION_PAYMENT_CALLBACK, RESPONDENT } from '../../../../urls';

@autobind
export default class GeneralApplicationPaymentPostController extends BaseGeneralApplicationPaymentPostController {
  protected getPaymentCallbackPath(): string {
    return RESPONDENT + GENERAL_APPLICATION_PAYMENT_CALLBACK;
  }
}
