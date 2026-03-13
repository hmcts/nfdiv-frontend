import autobind from 'autobind-decorator';
import { GENERAL_APPLICATION_PAYMENT_CALLBACK, RESPONDENT } from '../../../../urls';
import BaseGeneralApplicationPaymentPostController from '../../../../applicant1/interim-applications/common/general-application/pay-your-fee/post';

@autobind
export default class GeneralApplicationPaymentPostController extends BaseGeneralApplicationPaymentPostController {
  protected getPaymentCallbackPath(): string {
    return RESPONDENT + GENERAL_APPLICATION_PAYMENT_CALLBACK;
  }
}
