import autobind from 'autobind-decorator';

import { CITIZEN_SUBMIT, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import { PaymentModel } from '../../../app/payment/PaymentModel';

import BasePaymentPostController from '../../../app/controller/BasePaymentPostController';

@autobind
export default class PaymentPostController extends BasePaymentPostController {
  protected awaitingPaymentState(): State {
    return State.AwaitingPayment;
  }

  protected awaitingPaymentEvent(): string {
    return CITIZEN_SUBMIT;
  }

  protected getPayments(req: AppRequest<AnyObject>): PaymentModel {
    return new PaymentModel(req.session.userCase.payments || []);
  }
}
