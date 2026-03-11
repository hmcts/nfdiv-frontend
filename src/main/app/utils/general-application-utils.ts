import { CaseWithId } from '../case/case';
import {
  ApplicationType,
  GeneralApplication,
  GeneralParties,
  InterimApplicationType,
  OrderSummary,
  State,
  YesOrNo,
} from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';

const D11_GENERAL_APPLICATION_EXCLUDED_STATES: Set<State> = new Set([
  State.AwaitingGeneralApplicationPayment,
  State.AwaitingGenAppDocuments,
  State.AwaitingGeneralConsideration,
  State.GeneralApplicationReceived,
  State.AwaitingGeneralReferralPayment,
]);

export const findAllOnlineGenAppsForUser = (
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

export const findGenAppAwaitingPayment = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): GeneralApplication | undefined => {
  const serviceRequest = getGenAppServiceRequest(userCase, isApplicant2) as string;

  if (!serviceRequest) {
    return undefined;
  }

  return findAllOnlineGenAppsForUser(userCase, isApplicant2)?.find(
    application =>
      application?.generalApplicationFeeServiceRequestReference === serviceRequest &&
      !application?.generalApplicationFeePaymentReference &&
      application?.generalApplicationFeeHasCompletedOnlinePayment === YesOrNo.NO
  );
};

export const findGenAppAwaitingDocuments = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): GeneralApplication | undefined => {
  return findAllOnlineGenAppsForUser(userCase, isApplicant2)?.find(
    application => application?.generalApplicationDocsUploadedPreSubmission === YesOrNo.NO
  );
};

export const getGenAppServiceRequest = (userCase: Partial<CaseWithId>, isApplicant2: boolean): string | undefined => {
  return isApplicant2 ? userCase?.applicant2GeneralAppServiceRequest : userCase?.applicant1GeneralAppServiceRequest;
};

export const getGenAppFeeOrderSummary = (req: AppRequest<AnyObject>): OrderSummary | undefined => {
  return findGenAppAwaitingPayment(req.session.userCase, req.session.isApplicant2)?.generalApplicationFeeOrderSummary;
};

export const getGenAppPaymentsField = (req: AppRequest<AnyObject>): keyof AnyObject => {
  return req.session.isApplicant2 ? 'applicant2GeneralAppPayments' : 'applicant1GeneralAppPayments';
};

export const hasGenAppPaymentInProgress = (isApplicant2: boolean, userCase: Partial<CaseWithId>): boolean =>
  !!findGenAppAwaitingPayment(userCase, isApplicant2);

export const hasGenAppAwaitingDocuments = (isApplicant2: boolean, userCase: Partial<CaseWithId>): boolean =>
  !!findGenAppAwaitingDocuments(userCase, isApplicant2);

export const hasGenAppSaveAndSignOutContent = (isApplicant2: boolean, userCase: Partial<CaseWithId>): boolean => {
  const interimApplicationType = isApplicant2
    ? userCase.applicant2InterimApplicationType
    : userCase.applicant1InterimApplicationType;

  const isDraftingD11GeneralApplication =
    interimApplicationType === InterimApplicationType.DIGITISED_GENERAL_APPLICATION_D11;
  const hasPaymentInProgress = hasGenAppPaymentInProgress(isApplicant2, userCase);

  return (
    isDraftingD11GeneralApplication ||
    (hasPaymentInProgress && State.AwaitingGeneralApplicationPayment !== userCase.state)
  );
};

export const canStartNewGeneralApplication = (isApplicant2: boolean, userCase: Partial<CaseWithId>): boolean => {
  if (D11_GENERAL_APPLICATION_EXCLUDED_STATES.has(userCase.state as State)) {
    return false;
  }

  const caseHasGeneralReferral = !!userCase?.generalReferralType;
  if (caseHasGeneralReferral) {
    return false;
  }

  const isSoleRespondentCompletingAos =
    isApplicant2 && userCase?.applicationType === ApplicationType.SOLE_APPLICATION && !userCase?.dateAosSubmitted;
  if (isSoleRespondentCompletingAos) {
    return false;
  }

  const app1HasSubmittedGenApp =
    hasGenAppAwaitingDocuments(false, userCase) || hasGenAppPaymentInProgress(false, userCase);
  const app2HasSubmittedGenApp =
    hasGenAppAwaitingDocuments(true, userCase) || hasGenAppPaymentInProgress(true, userCase);
  const genAppHasBeenDrafted = hasGenAppSaveAndSignOutContent(isApplicant2, userCase);

  return !(app1HasSubmittedGenApp || app2HasSubmittedGenApp || genAppHasBeenDrafted);
};
