import autobind from 'autobind-decorator';

import { APPLICATION_PAYMENT_STATES, ApplicationType, CITIZEN_PAYMENT_MADE, CaseData, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import BasePaymentCallbackGetController from '../../../app/controller/BasePaymentCallbackGetController';
import {
  APPLICATION_SUBMITTED,
  CHECK_ANSWERS_URL,
  JOINT_APPLICATION_SUBMITTED,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
} from '../../urls';

@autobind
export default class PaymentCallbackGetController extends BasePaymentCallbackGetController {
  protected awaitingPaymentStates(): Set<State> {
    return APPLICATION_PAYMENT_STATES;
  }

  protected noPaymentRequiredUrl(): string {
    return CHECK_ANSWERS_URL;
  }

  protected paymentMadeEvent(): string {
    return CITIZEN_PAYMENT_MADE;
  }

  protected paymentSuccessUrl(req: AppRequest): string {
    return req.session.userCase.applicationType === ApplicationType.JOINT_APPLICATION
      ? JOINT_APPLICATION_SUBMITTED
      : APPLICATION_SUBMITTED;
  }

  protected paymentFailureUrl(req: AppRequest): string {
    return req.query.back
      ? CHECK_ANSWERS_URL
      : req.session.userCase.applicationType === ApplicationType.JOINT_APPLICATION
        ? PAY_AND_SUBMIT
        : PAY_YOUR_FEE;
  }

  protected paymentsCaseField(): keyof CaseData {
    return 'applicationPayments' as keyof CaseData;
  }
}
