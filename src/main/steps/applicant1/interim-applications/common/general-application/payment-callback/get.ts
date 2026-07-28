import autobind from 'autobind-decorator';

import { CITIZEN_GENERAL_APPLICATION_PAYMENT_MADE, CaseData } from '../../../../../../app/case/definition';
import { AppRequest } from '../../../../../../app/controller/AppRequest';
import BasePaymentCallbackGetController from '../../../../../../app/controller/BasePaymentCallbackGetController';
import { AnyObject } from '../../../../../../app/controller/PostController';
import {
  getGenAppPaymentsField,
  hasGenAppPaymentInProgress,
} from '../../../../../../app/utils/general-application-utils';

@autobind
export default abstract class BaseGeneralApplicationPaymentCallbackGetController extends BasePaymentCallbackGetController {
  protected isAwaitingPayment(req: AppRequest): boolean {
    return hasGenAppPaymentInProgress(req.session.isApplicant2, req.session.userCase);
  }

  protected noPaymentRequiredUrl(): string {
    throw new Error('Method not implemented. This should be overridden in subclasses.');
  }

  protected paymentMadeEvent(): string {
    return CITIZEN_GENERAL_APPLICATION_PAYMENT_MADE;
  }

  protected paymentSuccessUrl(): string {
    throw new Error('Method not implemented. This should be overridden in subclasses.');
  }

  protected paymentFailureUrl(): string {
    throw new Error('Method not implemented. This should be overridden in subclasses.');
  }

  protected paymentsCaseField(req: AppRequest<AnyObject>): keyof CaseData {
    return getGenAppPaymentsField(req) as keyof CaseData;
  }
}
