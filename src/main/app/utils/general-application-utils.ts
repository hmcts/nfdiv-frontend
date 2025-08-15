import { CaseWithId } from '../case/case';
import { GeneralApplication, GeneralParties, OrderSummary, YesOrNo } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';

export const hasUnpaidGeneralApplication = (request: AppRequest, serviceRequest: string | undefined): boolean => {
  if (!serviceRequest) {
    return false;
  }

  const generalApplications =
    getOnlineGeneralApplicationsForUser(request.session.userCase, request.session.isApplicant2) ?? [];

  return generalApplications.some(
    application =>
      application?.generalApplicationFeeServiceRequestReference === serviceRequest &&
      !application?.generalApplicationFeePaymentReference
  );
};

export const getOnlineGeneralApplicationsForUser = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): GeneralApplication[] | undefined => {
  const generalApplicationParty = isApplicant2 ? GeneralParties.RESPONDENT : GeneralParties.APPLICANT;

  return userCase?.generalApplications
    ?.map(generalApplicationValue => generalApplicationValue.value)
    ?.filter(
      application =>
        application?.generalParties === generalApplicationParty &&
        application?.generalApplicationSubmittedOnline === YesOrNo.YES
    );
};

export const generalApplicationServiceRequest = (req: AppRequest<AnyObject>): string | undefined => {
  return req.session.isApplicant2
    ? req.session.userCase.applicant2GeneralApplicationServiceRequest
    : req.session.userCase.applicant1GeneralApplicationServiceRequest;
};

export const generalApplicationFeeOrderSummary = (req: AppRequest<AnyObject>): OrderSummary | undefined => {
  return req.session.isApplicant2
    ? req.session.userCase.applicant2GeneralApplicationFeeOrderSummary
    : req.session.userCase.applicant1GeneralApplicationFeeOrderSummary;
};

export const generalApplicationPaymentsField = (req: AppRequest<AnyObject>): keyof AnyObject => {
  return req.session.isApplicant2 ? 'applicant2GenApplicationPayments' : 'applicant1GenApplicationPayments';
};
