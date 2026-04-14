import { CaseWithId } from '../case/case';
import {
  ApplicationType,
  GeneralApplication,
  GeneralApplicationType,
  GeneralParties,
  InterimApplicationType,
  OrderSummary,
  State,
  YesOrNo,
} from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';

export const D11_GENERAL_APPLICATION_EXCLUDED_STATES: Set<State> = new Set([
  State.Applicant2Approved,
  State.AwaitingPayment,
  State.Rejected,
  State.Withdrawn,
  State.Archived,
  State.AwaitingApplicant2Response,
  State.AwaitingGeneralApplicationPayment,
  State.AwaitingGenAppDocuments,
  State.AwaitingGeneralConsideration,
  State.GeneralApplicationReceived,
  State.AwaitingGeneralReferralPayment,
  State.ConditionalOrderPending,
  State.AwaitingJudgeClarification,
  State.AwaitingServiceConsideration,
  State.AwaitingServicePayment,
  State.BailiffRefused,
  State.ConditionalOrderDrafted,
  State.Draft,
  State.GeneralConsiderationComplete,
  State.LAServiceReview,
  State.PendingRefund,
  State.PendingServiceAppResponse,
  State.ServiceAdminRefusal,
  State.FinalOrderComplete,
]);

export const RESPONDENT_ONLY_GENERAL_APPLICATION_EXCLUDED_STATES: Set<State> = new Set([
  State.AwaitingFinalOrderPayment,
  State.RespondentFinalOrderRequested,
]);

const APPLICANT1_GEN_APP_PARTY_NAMES = new Set<GeneralParties>([GeneralParties.APPLICANT]);
const APPLICANT2_GEN_APP_PARTY_NAMES = new Set<GeneralParties>([GeneralParties.RESPONDENT, GeneralParties.APPLICANT2]);

export const findAllOnlineGenAppsForUser = (
  userCase: Partial<CaseWithId>,
  isApplicant2: boolean
): GeneralApplication[] | undefined => {
  const generalApplicationPartyNames = isApplicant2 ? APPLICANT2_GEN_APP_PARTY_NAMES : APPLICANT1_GEN_APP_PARTY_NAMES;

  return userCase?.generalApplications
    ?.map(generalApplicationValue => generalApplicationValue.value)
    ?.filter(
      application =>
        generalApplicationPartyNames.has(application?.generalApplicationParty as GeneralParties) &&
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

export const hasGenAppSaveAndSignOutContent = (isApplicant2: boolean, userCase: Partial<CaseWithId>): boolean => {
  const interimApplicationType = isApplicant2
    ? userCase.applicant2InterimApplicationType
    : userCase.applicant1InterimApplicationType;

  const isDraftingD11Application = interimApplicationType === InterimApplicationType.DIGITISED_GENERAL_APPLICATION_D11;
  const genAppAwaitingPayment = findGenAppAwaitingPayment(userCase, isApplicant2);

  const hasD11ApplicationPaymentInProgress =
    !!genAppAwaitingPayment &&
    genAppAwaitingPayment?.generalApplicationType !== GeneralApplicationType.SEARCH_GOV_RECORDS;

  return isDraftingD11Application || hasD11ApplicationPaymentInProgress;
};

export const isGenAppExclusionState = (isApplicant2: boolean, userCase: Partial<CaseWithId>): boolean => {
  const state = userCase.state as State;
  const isSoleRespondent = isApplicant2 && userCase.applicationType === ApplicationType.SOLE_APPLICATION;

  return (
    D11_GENERAL_APPLICATION_EXCLUDED_STATES.has(state) ||
    (isSoleRespondent && RESPONDENT_ONLY_GENERAL_APPLICATION_EXCLUDED_STATES.has(state))
  );
};

export const canSubmitD11GeneralApplication = (isApplicant2: boolean, userCase: Partial<CaseWithId>): boolean => {
  if (isGenAppExclusionState(isApplicant2, userCase)) {
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

  const eitherPartyHasGenAppAwaitingPayment = hasGenAppPaymentInProgress(false, userCase) || hasGenAppPaymentInProgress(true, userCase);

  return !eitherPartyHasGenAppAwaitingPayment;
};

export const canStartNewGeneralApplication = (isApplicant2: boolean, userCase: Partial<CaseWithId>): boolean => {
  const submissionAllowed = canSubmitD11GeneralApplication(isApplicant2, userCase);
  const genAppHasBeenDrafted = hasGenAppSaveAndSignOutContent(isApplicant2, userCase);

  return submissionAllowed && !genAppHasBeenDrafted;
};
