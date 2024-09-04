import autobind from 'autobind-decorator';

import { CITIZEN_SUBMIT, CaseData, DivorceOrDissolution, OrderSummary, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import BasePaymentPostController from '../../../app/controller/BasePaymentPostController';
import { AnyObject } from '../../../app/controller/PostController';

@autobind
export default class PaymentPostController extends BasePaymentPostController {
  protected awaitingPaymentState(): State {
    return State.AwaitingPayment;
  }

  protected awaitingPaymentEvent(): string {
    return CITIZEN_SUBMIT;
  }

  protected getOrderSummary(req: AppRequest<AnyObject>): OrderSummary {
    return req.session.userCase.applicationFeeOrderSummary;
  }

  protected paymentsCaseField(): keyof CaseData {
    return 'applicationPayments' as keyof CaseData;
  }

  protected getResponsiblePartyName(req: AppRequest<AnyObject>): string | undefined {
    return req.session.userCase.applicant1FullNameOnCertificate;
  }

  protected getFeeDescription(req: AppRequest<AnyObject>): string {
    const isDivorce = req.session.userCase.divorceOrDissolution === DivorceOrDissolution.DIVORCE;

    return `${isDivorce ? 'Divorce' : 'Ending your civil partnership'} application fee`;
  }
}
