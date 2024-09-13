import dayjs from 'dayjs';

import { CaseWithId } from '../../../../app/case/case';
import { ServiceApplicationRefusalReason, State, YesOrNo } from '../../../../app/case/definition';
import { HubTemplate } from '../../../common/hubTemplates';
import { StateSequence } from '../../../state-sequence';

export const getSoleHubTemplate = (
  displayState: StateSequence,
  userCase: Partial<CaseWithId>,
  isSuccessfullyServedByBailiff: boolean,
  isAlternativeService: boolean
): string => {
  const isServiceApplicationGranted =
    userCase.alternativeServiceOutcomes?.[0].value.serviceApplicationGranted === YesOrNo.YES;
  const isAosOverdue =
    !userCase.aosStatementOfTruth && userCase.issueDate && dayjs(userCase.issueDate).add(16, 'days').isBefore(dayjs());
  const isRefusalOrderToApplicant =
    userCase.alternativeServiceOutcomes?.[0].value.refusalReason ===
    ServiceApplicationRefusalReason.REFUSAL_ORDER_TO_APPLICANT;

  switch (displayState.state()) {
    case State.RespondentFinalOrderRequested:
    case State.FinalOrderRequested: {
      return HubTemplate.FinalOrderRequested;
    }
    case State.AwaitingServiceConsideration:
    case State.AwaitingBailiffReferral:
    case State.BailiffRefused: {
      return HubTemplate.AwaitingServiceConsiderationOrAwaitingBailiffReferral;
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
      } else if (isAosOverdue) {
        return HubTemplate.AoSDue;
      } else {
        return HubTemplate.AosAwaitingOrDrafted;
      }
    case State.AwaitingGeneralConsideration:
      if (userCase.dateFinalOrderSubmitted) {
        return HubTemplate.FinalOrderRequested;
      } else if (userCase.aosStatementOfTruth) {
        return HubTemplate.AwaitingGeneralConsideration;
      } else if (isAosOverdue) {
        return HubTemplate.AoSDue;
      } else {
        return HubTemplate.AosAwaitingOrDrafted;
      }
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
        return HubTemplate.AwaitingServiceConsiderationOrAwaitingBailiffReferral;
      }
    case State.PendingHearingOutcome:
    case State.PendingHearingDate:
      return HubTemplate.PendingHearingOutcome;
    case State.AwaitingDocuments:
      return HubTemplate.AwaitingDocuments;
    default: {
      if (displayState.isAfter('AosDrafted') && displayState.isBefore('Holding')) {
        return HubTemplate.AoSDue;
      }
      return HubTemplate.AosAwaitingOrDrafted;
    }
  }
};
