import {
  CITIZEN_GENERAL_APPLICATION,
  CaseData,
  Fee,
  GENERAL_APPLICATION_PAYMENT_STATES,
  ListValue,
  OrderSummary,
} from '../../../../../app/case/definition.js';
import { AppRequest } from '../../../../../app/controller/AppRequest.js';
import BasePaymentPostController from '../../../../../app/controller/BasePaymentPostController.js';
import { AnyObject } from '../../../../../app/controller/PostController.js';
import autobind from '../../../../../app/utils/autobind.js';
import {
  findUnpaidGeneralApplication,
  getGeneralApplicationOrderSummary,
  getGeneralApplicationPaymentsField,
  getGeneralApplicationServiceRequest,
} from '../../../../../app/utils/general-application-utils.js';
import { GENERAL_APPLICATION_PAYMENT_CALLBACK } from '../../../../urls.js';

@autobind
export default class GeneralApplicationPaymentPostController extends BasePaymentPostController {
  protected readyForPayment(req: AppRequest<AnyObject>): boolean {
    const serviceRequest = this.getServiceReferenceForFee(req);

    return (
      GENERAL_APPLICATION_PAYMENT_STATES.has(req.session.userCase.state) &&
      findUnpaidGeneralApplication(req.session.userCase, serviceRequest) !== undefined
    );
  }

  protected awaitingPaymentEvent(): string {
    return CITIZEN_GENERAL_APPLICATION;
  }

  protected getFeesFromOrderSummary(req: AppRequest<AnyObject>): ListValue<Fee>[] {
    return (getGeneralApplicationOrderSummary(req) as OrderSummary)?.Fees;
  }

  protected paymentsCaseField(req: AppRequest<AnyObject>): keyof CaseData {
    return getGeneralApplicationPaymentsField(req) as keyof CaseData;
  }

  protected getServiceReferenceForFee(req: AppRequest<AnyObject>): string {
    return getGeneralApplicationServiceRequest(req) as string;
  }

  protected getPaymentCallbackPath(): string {
    return GENERAL_APPLICATION_PAYMENT_CALLBACK;
  }
}
