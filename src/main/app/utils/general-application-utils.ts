import { GeneralApplication, GeneralParties, OrderSummary } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';

export const findUnpaidGeneralApplication = (req: AppRequest<AnyObject>): GeneralApplication | undefined => {
  return getGeneralApplicationsForUser(req)?.find(
    generalApplication =>
      isAwaitingPayment(generalApplication, req) && hasMatchingApplicationType(generalApplication, req)
  );
};

const getGeneralApplicationsForUser = (req: AppRequest<AnyObject>): GeneralApplication[] | undefined => {
  const generalApplicationParty = req.session.isApplicant2 ? GeneralParties.RESPONDENT : GeneralParties.APPLICANT;

  return req.session.userCase.generalApplications
    ?.map(generalApplicationValue => generalApplicationValue.value)
    ?.filter(generalApplication => generalApplication.generalApplicationFrom === generalApplicationParty);
};

const isAwaitingPayment = (generalApplication: GeneralApplication, req: AppRequest<AnyObject>): boolean => {
  const applicationServiceRequest = generalApplication.generalApplicationFeeServiceRequestReference;
  const notPaid = !generalApplication.generalApplicationFeePaymentReference;

  return applicationServiceRequest === generalApplicationServiceRequest(req) && notPaid;
};

const hasMatchingApplicationType = (generalApplication: GeneralApplication, req: AppRequest<AnyObject>): boolean => {
  const generalApplicationType = generalApplication.generalApplicationType;
  const interimApplicationType = req.session.isApplicant2
    ? req.session.userCase.applicant2InterimApplicationType
    : req.session.userCase.applicant1InterimApplicationType;

  return (
    generalApplication.generalApplicationType &&
    (generalApplicationType as string) === (interimApplicationType as string)
  );
};

export const generalApplicationServiceRequest = (req: AppRequest<AnyObject>): string => {
  return req.session.isApplicant2
    ? req.session.userCase.applicant2GeneralApplicationServiceRequest
    : req.session.userCase.applicant1GeneralApplicationServiceRequest;
};

export const generalApplicationFeeOrderSummary = (req: AppRequest<AnyObject>): OrderSummary => {
  return req.session.isApplicant2
    ? req.session.userCase.applicant2GeneralApplicationFeeOrderSummary
    : req.session.userCase.applicant1GeneralApplicationFeeOrderSummary;
};

export const generalApplicationPaymentsField = (req: AppRequest<AnyObject>): keyof AnyObject => {
  return req.session.isApplicant2 ? 'applicant2GenApplicationPayments' : 'applicant1GenApplicationPayments';
};
