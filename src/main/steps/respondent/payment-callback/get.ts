import { RESPONDENT_FINAL_ORDER_PAYMENT_MADE } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import BasePaymentCallbackGetController from '../../../app/controller/BasePaymentCallbackGetController';
import { PaymentModel } from '../../../app/payment/PaymentModel';
import {
  HUB_PAGE,
  PAY_YOUR_FINAL_ORDER_FEE,
} from '../../urls';

export default class PaymentCallbackGetController extends BasePaymentCallbackGetController {
  protected noPaymentRequiredUrl(req: AppRequest) {
    return HUB_PAGE;
  }

  protected paymentMadeUrl(req: AppRequest) {
    return RESPONDENT_FINAL_ORDER_PAYMENT_MADE;
  }

  protected paymentSuccessfulUrl(req: AppRequest) {
    return HUB_PAGE;
  }

  protected paymentFailedUrl(req: AppRequest) {
    return PAY_YOUR_FINAL_ORDER_FEE;
  }

  protected getPayments(req: AppRequest): PaymentModel {
    return new PaymentModel(req.session.userCase.finalOrderPayments);
  }
}
