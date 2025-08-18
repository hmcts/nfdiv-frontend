import autobind from 'autobind-decorator';

import {
  CITIZEN_GENERAL_APPLICATION,
  CaseData,
  Fee,
  GENERAL_APPLICATION_PAYMENT_STATES,
  ListValue,
  OrderSummary,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import BasePaymentPostController from '../../../../app/controller/BasePaymentPostController';
import { AnyObject } from '../../../../app/controller/PostController';
import {
  findUnpaidGeneralApplication,
  getGeneralApplicationOrderSummary,
  getGeneralApplicationServiceRequest,
} from '../../../../app/utils/general-application-utils';
import { GENERAL_APPLICATION_PAYMENT_CALLBACK } from '../../../urls';

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
    return req.session.isApplicant2
      ? ('applicant2GeneralAppPayments' as keyof CaseData)
      : ('applicant1GeneralAppPayments' as keyof CaseData);
  }

  protected getServiceReferenceForFee(req: AppRequest<AnyObject>): string {
    return getGeneralApplicationServiceRequest(req) as string;
  }

  protected getPaymentCallbackPath(): string {
    return GENERAL_APPLICATION_PAYMENT_CALLBACK;
  }
}
