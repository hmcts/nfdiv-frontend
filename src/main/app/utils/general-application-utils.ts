import { Logger } from '@hmcts/nodejs-logging';

import { CaseWithId } from '../case/case';
import { GeneralApplication, GeneralParties, OrderSummary, YesOrNo } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';

const logger = Logger.getLogger('general-application-utils');

export const hasUnpaidGeneralApplication = (request: AppRequest, serviceRequest: string | undefined): boolean => {
  if (!serviceRequest) {
    return false;
  }

  const generalApplications =
    findOnlineGeneralApplicationsForUser(request.session.userCase, request.session.isApplicant2) ?? [];

  return generalApplications.some(
    application =>
      application?.generalApplicationFeeServiceRequestReference === serviceRequest &&
      !application?.generalApplicationFeePaymentReference
  );
};

export const findOnlineGeneralApplicationsForUser = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): GeneralApplication[] | undefined => {
  const generalApplicationParty = isApplicant2 ? GeneralParties.RESPONDENT : GeneralParties.APPLICANT;

  return userCase?.generalApplications
    ?.map(generalApplicationValue => generalApplicationValue.value)
    ?.filter(
      application =>
        application?.generalApplicationParty === generalApplicationParty &&
        application?.generalApplicationSubmittedOnline === YesOrNo.YES
    );
};

export const generalAppServiceRequest = (req: AppRequest<AnyObject>): string | undefined => {
  return req.session.isApplicant2
    ? req.session.userCase.applicant2GeneralAppServiceRequest
    : req.session.userCase.applicant1GeneralAppServiceRequest;
};

export const generalAppOrderSummary = (req: AppRequest<AnyObject>): OrderSummary | undefined => {
  logger.info(req.session.userCase.applicant1GeneralAppOrderSummary);
  logger.info(req.session.userCase.applicant2GeneralAppOrderSummary);

  return req.session.isApplicant2
    ? req.session.userCase.applicant2GeneralAppOrderSummary
    : req.session.userCase.applicant1GeneralAppOrderSummary;
};

export const generalApplicationPaymentsField = (req: AppRequest<AnyObject>): keyof AnyObject => {
  return req.session.isApplicant2 ? 'applicant2GeneralAppPayments' : 'applicant1GeneralAppPayments';
};
