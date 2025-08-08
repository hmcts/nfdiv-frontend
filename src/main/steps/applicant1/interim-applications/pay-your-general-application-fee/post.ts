import autobind from 'autobind-decorator';

import {
  CITIZEN_GENERAL_APPLICATION,
  CaseData,
  Fee,
  GENERAL_APPLICATION_PAYMENT_STATES,
  ListValue,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import BasePaymentPostController from '../../../../app/controller/BasePaymentPostController';
import { AnyObject } from '../../../../app/controller/PostController';
import {
  generalApplicationFeeOrderSummary,
  generalApplicationServiceRequest,
} from '../../../../app/utils/general-application-utils';
import { GENERAL_APPLICATION_PAYMENT_CALLBACK } from '../../../urls';

@autobind
export default class GeneralApplicationPaymentPostController extends BasePaymentPostController {
  protected readyForPayment(req: AppRequest<AnyObject>): boolean {
    return (
      GENERAL_APPLICATION_PAYMENT_STATES.has(req.session.userCase.state) &&
      this.getServiceReferenceForFee(req)?.length > 0
    );
  }

  protected awaitingPaymentEvent(): string {
    return CITIZEN_GENERAL_APPLICATION;
  }

  protected getFeesFromOrderSummary(req: AppRequest<AnyObject>): ListValue<Fee>[] {
    return generalApplicationFeeOrderSummary(req).Fees;
  }

  protected paymentsCaseField(req: AppRequest<AnyObject>): keyof CaseData {
    return req.session.isApplicant2
      ? ('applicant2GeneralApplicationPayments' as keyof CaseData)
      : ('applicant1GeneralApplicationPayments' as keyof CaseData);
  }

  protected getServiceReferenceForFee(req: AppRequest<AnyObject>): string {
    return generalApplicationServiceRequest(req);
  }

  protected getPaymentCallbackPath(): string {
    return GENERAL_APPLICATION_PAYMENT_CALLBACK;
  }
}
