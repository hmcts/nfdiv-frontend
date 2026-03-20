import autobind from 'autobind-decorator';

import {
  CITIZEN_GENERAL_APPLICATION,
  CaseData,
  Fee,
  ListValue,
  OrderSummary,
} from '../../../../../../app/case/definition';
import { AppRequest } from '../../../../../../app/controller/AppRequest';
import BasePaymentPostController from '../../../../../../app/controller/BasePaymentPostController';
import { AnyObject } from '../../../../../../app/controller/PostController';
import {
  getGenAppFeeOrderSummary,
  getGenAppPaymentsField,
  getGenAppServiceRequest,
  hasGenAppPaymentInProgress,
} from '../../../../../../app/utils/general-application-utils';

@autobind
export default abstract class BaseGeneralApplicationPaymentPostController extends BasePaymentPostController {
  protected readyForPayment(req: AppRequest<AnyObject>): boolean {
    return hasGenAppPaymentInProgress(req.session.isApplicant2, req.session.userCase);
  }

  protected awaitingPaymentEvent(): string {
    return CITIZEN_GENERAL_APPLICATION;
  }

  protected getFeesFromOrderSummary(req: AppRequest<AnyObject>): ListValue<Fee>[] {
    return (getGenAppFeeOrderSummary(req) as OrderSummary)?.Fees;
  }

  protected paymentsCaseField(req: AppRequest<AnyObject>): keyof CaseData {
    return getGenAppPaymentsField(req) as keyof CaseData;
  }

  protected getServiceReferenceForFee(req: AppRequest<AnyObject>): string {
    return getGenAppServiceRequest(req.session.userCase, req.session.isApplicant2) as string;
  }

  protected getPaymentCallbackPath(): string {
    throw new Error('Method not implemented. This should be overridden in subclasses.');
  }
}
