import { CaseWithId } from '../case/case';
import { GeneralApplication, GeneralParties, OrderSummary, YesOrNo } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';

export const findUnpaidGeneralApplication = (
  userCase: Partial<CaseWithId>,
  serviceRequest: string | undefined
): GeneralApplication | undefined => {
  if (!serviceRequest) {
    return undefined;
  }

  return userCase?.generalApplications
    ?.map(generalApplicationValue => generalApplicationValue.value)
    ?.find(
      application =>
        application?.generalApplicationFeeServiceRequestReference === serviceRequest &&
        !application?.generalApplicationFeePaymentReference &&
        application?.generalApplicationFeeHasCompletedOnlinePayment === YesOrNo.NO
    );
};

export const hasGeneralApplicationPaymentInProgress = (isApplicant2: boolean, userCase: Partial<CaseWithId>) =>
  !!findUnpaidGeneralApplication(userCase, getGeneralApplicationServiceRequest(isApplicant2, userCase) as string);

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

export const getGeneralApplicationServiceRequest = (
  isApplicant2: boolean,
  userCase: Partial<CaseWithId>
): string | undefined => {
  return isApplicant2 ? userCase?.applicant2GeneralAppServiceRequest : userCase?.applicant1GeneralAppServiceRequest;
};

export const getGeneralApplicationOrderSummary = (req: AppRequest<AnyObject>): OrderSummary | undefined => {
  const serviceRequest = getGeneralApplicationServiceRequest(req.session.isApplicant2, req.session.userCase) as string;

  return findUnpaidGeneralApplication(req.session.userCase, serviceRequest)?.generalApplicationFeeOrderSummary;
};

export const getGeneralApplicationPaymentsField = (req: AppRequest<AnyObject>): keyof AnyObject => {
  return req.session.isApplicant2 ? 'applicant2GeneralAppPayments' : 'applicant1GeneralAppPayments';
};
