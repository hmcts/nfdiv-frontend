import autobind from 'autobind-decorator';

import { CITIZEN_GENERAL_APPLICATION_PAYMENT_MADE, CaseData } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import BasePaymentCallbackGetController from '../../../../../app/controller/BasePaymentCallbackGetController';
import { AnyObject } from '../../../../../app/controller/PostController';
import { getGenAppPaymentsField, hasGenAppPaymentInProgress } from '../../../../../app/utils/general-application-utils';
import { GENERAL_APPLICATION_SUBMITTED, HUB_PAGE, PAY_YOUR_GENERAL_APPLICATION_FEE, RESPONDENT } from '../../../../urls';

@autobind
export default class GeneralApplicationPaymentCallbackGetController extends BasePaymentCallbackGetController {
  protected isAwaitingPayment(req: AppRequest): boolean {
    return hasGenAppPaymentInProgress(req.session.isApplicant2, req.session.userCase);
  }

  protected noPaymentRequiredUrl(): string {
    return RESPONDENT + HUB_PAGE;
  }

  protected paymentMadeEvent(): string {
    return CITIZEN_GENERAL_APPLICATION_PAYMENT_MADE;
  }

  protected paymentSuccessUrl(): string {
    return RESPONDENT + GENERAL_APPLICATION_SUBMITTED;
  }

  protected paymentFailureUrl(): string {
    return RESPONDENT + PAY_YOUR_GENERAL_APPLICATION_FEE;
  }

  protected paymentsCaseField(req: AppRequest<AnyObject>): keyof CaseData {
    return getGenAppPaymentsField(req) as keyof CaseData;
  }
}
