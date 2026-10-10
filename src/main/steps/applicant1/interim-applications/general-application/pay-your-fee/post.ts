import autobind from 'autobind-decorator';

import { GENERAL_APPLICATION_PAYMENT_CALLBACK } from '../../../../urls';
import BaseGeneralApplicationPaymentPostController from '../../common/general-application/pay-your-fee/post';

@autobind
export default class GeneralApplicationPaymentPostController extends BaseGeneralApplicationPaymentPostController {
  protected getPaymentCallbackPath(): string {
    return GENERAL_APPLICATION_PAYMENT_CALLBACK;
  }
}
