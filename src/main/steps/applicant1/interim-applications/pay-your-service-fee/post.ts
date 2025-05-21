import autobind from 'autobind-decorator';

import { CaseWithId } from '../../../../app/case/case';
import { CITIZEN_SERVICE_APPLICATION, CaseData, Fee, ListValue, State } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import BasePaymentPostController from '../../../../app/controller/BasePaymentPostController';
import { AnyObject } from '../../../../app/controller/PostController';
import { SERVICE_PAYMENT_CALLBACK } from '../../../urls';

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
    return 'servicePayments' as keyof CaseData;
  }

  protected getServiceReferenceForFee(req: AppRequest<AnyObject>): string {
    return req.session.userCase.servicePaymentFeeServiceRequestReference;
  }

  protected getPaymentCallbackPath(): string {
    return SERVICE_PAYMENT_CALLBACK;
  }
}
