import autobind from 'autobind-decorator';

import { RESPONDENT_APPLY_FOR_FINAL_ORDER, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import BasePaymentPostController from '../../../app/controller/BasePaymentPostController';
import { AnyObject } from '../../../app/controller/PostController';
import { PaymentModel } from '../../../app/payment/PaymentModel';

@autobind
export default class FinalOrderPaymentPostController extends BasePaymentPostController {
  protected awaitingPaymentState(): State {
    return State.AwaitingRespondentFOPayment;
  }

  protected awaitingPaymentEvent(): string {
    return RESPONDENT_APPLY_FOR_FINAL_ORDER;
  }

  protected getPayments(req: AppRequest<AnyObject>): PaymentModel {
    return new PaymentModel(req.session.userCase.finalOrderPayments || []);
  }
}
