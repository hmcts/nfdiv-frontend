import autobind from 'autobind-decorator';

import {
  CITIZEN_GENERAL_APPLICATION_PAYMENT_MADE,
  CaseData,
  GENERAL_APPLICATION_PAYMENT_STATES,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import BasePaymentCallbackGetController from '../../../../app/controller/BasePaymentCallbackGetController';
import { AnyObject } from '../../../../app/controller/PostController';
import {
  generalApplicationPaymentsField,
  generalApplicationServiceRequest,
} from '../../../../app/utils/general-application-utils';
import { GENERAL_APPLICATION_SUBMITTED, HUB_PAGE, PAY_YOUR_GENERAL_APPLICATION_FEE } from '../../../urls';

@autobind
export default class GeneralApplicationPaymentCallbackGetController extends BasePaymentCallbackGetController {
  protected isAwaitingPayment(req: AppRequest): boolean {
    return (
      GENERAL_APPLICATION_PAYMENT_STATES.has(req.session.userCase.state) &&
      generalApplicationServiceRequest(req)?.length > 0
    );
  }

  protected noPaymentRequiredUrl(): string {
    return HUB_PAGE;
  }

  protected paymentMadeEvent(): string {
    return CITIZEN_GENERAL_APPLICATION_PAYMENT_MADE;
  }

  protected paymentSuccessUrl(): string {
    return GENERAL_APPLICATION_SUBMITTED;
  }

  protected paymentFailureUrl(): string {
    return PAY_YOUR_GENERAL_APPLICATION_FEE;
  }

  protected paymentsCaseField(req: AppRequest<AnyObject>): keyof CaseData {
    return generalApplicationPaymentsField(req) as keyof CaseData;
  }
}
