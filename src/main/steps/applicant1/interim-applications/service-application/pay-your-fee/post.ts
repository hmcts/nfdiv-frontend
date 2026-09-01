import {
  CITIZEN_SERVICE_APPLICATION,
  CaseData,
  Fee,
  ListValue,
  SERVICE_PAYMENT_STATES,
} from '../../../../../app/case/definition.js';
import { AppRequest } from '../../../../../app/controller/AppRequest.js';
import BasePaymentPostController from '../../../../../app/controller/BasePaymentPostController.js';
import { AnyObject } from '../../../../../app/controller/PostController.js';
import autobind from '../../../../../app/utils/autobind.js';
import { SERVICE_PAYMENT_CALLBACK } from '../../../../urls.js';

@autobind
export default class ServicePaymentPostController extends BasePaymentPostController {
  protected readyForPayment(req: AppRequest<AnyObject>): boolean {
    return SERVICE_PAYMENT_STATES.has(req.session.userCase.state);
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
