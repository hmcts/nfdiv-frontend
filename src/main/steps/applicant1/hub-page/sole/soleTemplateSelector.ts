import dayjs from 'dayjs';

import { CaseWithId, Checkbox } from '../../../../app/case/case';
import {
  AlternativeServiceType,
  GeneralApplicationType,
  ServiceApplicationRefusalReason,
  ServiceMethod,
  State,
  YesOrNo,
} from '../../../../app/case/definition';
import { HubTemplate } from '../../../common/hubTemplates';
import { StateSequence } from '../../../state-sequence';

export const getSoleHubTemplate = (
  displayState: StateSequence,
  userCase: Partial<CaseWithId>,
  isSuccessfullyServedByBailiff: boolean,
  isAlternativeService: boolean,
  isApplicantAbleToRespondToRequestForInformation: boolean = false,
  isAwaitingProcessServerService: boolean = false
): string | undefined => {
  const isServiceApplicationGranted =
    userCase.alternativeServiceOutcomes?.[0].value.serviceApplicationGranted === YesOrNo.YES;
  const isAlternativeServiceApplicationGranted =
    isServiceApplicationGranted &&
    userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType ===
      AlternativeServiceType.ALTERNATIVE_SERVICE;
  const isAosOverdue =
    !userCase.aosStatementOfTruth && userCase.issueDate && dayjs(userCase.issueDate).add(16, 'days').isBefore(dayjs());
  const isRefusalOrderToApplicant =
    userCase.alternativeServiceOutcomes?.[0].value.refusalReason ===
    ServiceApplicationRefusalReason.REFUSAL_ORDER_TO_APPLICANT;
  const serviceApplicationInProgress = !!userCase.receivedServiceApplicationDate;
  const isPersonalServiceRequired = userCase.serviceMethod === ServiceMethod.PERSONAL_SERVICE;

  const latestGeneralApplication = userCase.generalApplications?.[0]?.value;
  const isSearchGovRecords =
    latestGeneralApplication?.generalApplicationType === (GeneralApplicationType.SEARCH_GOV_RECORDS as string);
  const isOnlineGeneralApplication = latestGeneralApplication?.generalApplicationSubmittedOnline === YesOrNo.YES;

  switch (displayState.state()) {
    case State.RespondentFinalOrderRequested:
    case State.FinalOrderRequested: {
      return HubTemplate.FinalOrderRequested;
    }
    case State.AwaitingGeneralApplicationPayment: {
      return HubTemplate.AwaitingGeneralApplicationPayment;
    }
    case State.AwaitingServicePayment: {
      return HubTemplate.AwaitingServicePayment;
    }
    case State.AwaitingServiceConsideration:
    case State.LAServiceReview:
    case State.AwaitingBailiffReferral:
      return HubTemplate.AwaitingServiceConsiderationOrAwaitingBailiffReferral;
    case State.BailiffRefused: {
      return HubTemplate.ServiceAdminRefusalOrBailiffRefusedOrAlternativeServiceGranted;
    }
    case State.ConditionalOrderPronounced: {
      return HubTemplate.ConditionalOrderPronounced;
    }
    case State.AwaitingAdminClarification:
    case State.AwaitingLegalAdvisorReferral:
    case State.LAReview:
    case State.AwaitingPronouncement:
    case State.ConditionalOrderReview:
      return HubTemplate.AwaitingLegalAdvisorReferralOrAwaitingPronouncement;
    case State.GeneralConsiderationComplete:
      if (userCase.dateFinalOrderSubmitted) {
        return HubTemplate.FinalOrderRequested;
      } else if (userCase.coGrantedDate) {
        return HubTemplate.ConditionalOrderPronounced;
      } else if (userCase.coApplicant1SubmittedDate || userCase.coApplicant2SubmittedDate) {
        return HubTemplate.AwaitingConditionalOrder;
      } else if (!userCase.dueDate && userCase.aosStatementOfTruth) {
        return HubTemplate.AwaitingGeneralConsideration;
      } else if (isAlternativeServiceApplicationGranted) {
        return HubTemplate.ServiceAdminRefusalOrBailiffRefusedOrAlternativeServiceGranted;
      } else if (isAosOverdue) {
        return HubTemplate.AoSDue;
      } else {
        return HubTemplate.AosAwaitingOrDrafted;
      }
    case State.AwaitingGeneralConsideration:
      if (isSearchGovRecords) {
        return isOnlineGeneralApplication ? HubTemplate.AwaitingGeneralApplicationConsideration : HubTemplate.AoSDue;
      } else if (userCase.dateFinalOrderSubmitted) {
        return HubTemplate.FinalOrderRequested;
      } else if (userCase.aosStatementOfTruth) {
        return HubTemplate.AwaitingGeneralConsideration;
      } else if (isAosOverdue) {
        return HubTemplate.AoSDue;
      } else {
        return HubTemplate.AosAwaitingOrDrafted;
      }
    case State.GeneralApplicationReceived:
      return isOnlineGeneralApplication ? HubTemplate.AwaitingGeneralApplicationConsideration : HubTemplate.AoSDue;
    case State.AwaitingConditionalOrder:
      return HubTemplate.AwaitingConditionalOrder;
    case State.Holding:
      return HubTemplate.Holding;
    case State.AwaitingClarification:
      return HubTemplate.AwaitingClarification;
    case State.ClarificationSubmitted:
      if (userCase.coIsAdminClarificationSubmitted === YesOrNo.YES) {
        return HubTemplate.AwaitingLegalAdvisorReferralOrAwaitingPronouncement;
      } else {
        return HubTemplate.ClarificationSubmitted;
      }
    case State.AwaitingAmendedApplication:
      return HubTemplate.AwaitingAmendedApplication;
    case State.AwaitingBailiffService:
    case State.IssuedToBailiff:
      return HubTemplate.AwaitingBailiffService;
    case State.AwaitingFinalOrder:
    case State.AwaitingFinalOrderPayment:
      return HubTemplate.AwaitingFinalOrderOrFinalOrderOverdue;
    case State.FinalOrderComplete:
      return HubTemplate.FinalOrderComplete;
    case State.AwaitingAos:
      if (isServiceApplicationGranted && !isSuccessfullyServedByBailiff) {
        return HubTemplate.BailiffServiceUnsuccessful;
      } else if (isAlternativeService && !isServiceApplicationGranted) {
        return HubTemplate.ServiceApplicationRejected;
      } else {
        return HubTemplate.AosAwaitingOrDrafted;
      }
    case State.ServiceAdminRefusal:
      if (isAlternativeService && !isServiceApplicationGranted && isRefusalOrderToApplicant) {
        return HubTemplate.ServiceApplicationRejected;
      } else {
        return HubTemplate.ServiceAdminRefusalOrBailiffRefusedOrAlternativeServiceGranted;
      }
    case State.PendingHearingOutcome:
    case State.PendingHearingDate:
      return HubTemplate.PendingHearingOutcome;
    case State.InformationRequested:
      return isApplicantAbleToRespondToRequestForInformation
        ? HubTemplate.InformationRequested
        : HubTemplate.InformationRequestedFromOther;
    case State.AwaitingRequestedInformation:
      return isApplicantAbleToRespondToRequestForInformation
        ? HubTemplate.AwaitingRequestedInformation
        : HubTemplate.InformationRequestedFromOther;
    case State.RequestedInformationSubmitted:
      return isApplicantAbleToRespondToRequestForInformation
        ? HubTemplate.RespondedToInformationRequest
        : HubTemplate.InformationRequestedFromOther;
    case State.AwaitingHWFDecision:
    case State.AwaitingHWFEvidence:
      return userCase.applicant1CannotUpload === Checkbox.Checked
        ? HubTemplate.AwaitingDocuments
        : HubTemplate.AosAwaitingOrDrafted;
    case State.AwaitingDocuments:
      return serviceApplicationInProgress
        ? HubTemplate.AwaitingServiceApplicationDocuments
        : HubTemplate.AwaitingDocuments;
    case State.AwaitingService:
      return isAwaitingProcessServerService
        ? HubTemplate.AwaitingProcessServerService
        : isPersonalServiceRequired
          ? HubTemplate.AwaitingService
          : HubTemplate.AosAwaitingOrDrafted;
    case State.WelshTranslationRequested:
    case State.WelshTranslationReview:
      return HubTemplate.WelshTranslationRequestedOrReview;
    default: {
      if (
        (State.AosDrafted && isAosOverdue) ||
        (displayState.isAfter('AosDrafted') && displayState.isBefore('Holding'))
      ) {
        return HubTemplate.AoSDue;
      }
      return HubTemplate.AosAwaitingOrDrafted;
    }
  }
};
