import autobind from 'autobind-decorator';

import {
  CITIZEN_SERVICE_APPLICATION,
  CaseData,
  Fee,
  ListValue,
  State,
} from '../../../../app/case/definition';
import { CaseWithId } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import BasePaymentPostController from '../../../../app/controller/BasePaymentPostController';
import { AnyObject } from '../../../../app/controller/PostController';
import { GENERAL_APPLICATION_PAYMENT_CALLBACK } from '../../../../steps/urls';

@autobind
export default class ServicePaymentPostController extends BasePaymentPostController {
  protected readyForPayment(userCase: CaseWithId): boolean {
    return State.AwaitingServicePayment === userCase.state;
  }

  protected awaitingPaymentEvent(): string {
    return CITIZEN_SERVICE_APPLICATION;
  }

  protected getFeesFromOrderSummary(req: AppRequest<AnyObject>): ListValue<Fee>[] {
    return req.session.userCase.servicePaymentFeeOrderSummary.Fees;
  }

  protected paymentsCaseField(): keyof CaseData {
    return 'applicant1ServicePayments' as keyof CaseData;
  }

  protected getServiceReferenceForFee(req: AppRequest<AnyObject>): string {
    return req.session.userCase.servicePaymentFeeServiceRequestReference;
  }

  protected getPaymentCallbackPath(): string {
    return GENERAL_APPLICATION_PAYMENT_CALLBACK;
  }
}
