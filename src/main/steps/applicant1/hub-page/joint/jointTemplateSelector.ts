import { CaseWithId, Checkbox } from '../../../../app/case/case';
import { State, YesOrNo } from '../../../../app/case/definition';
import { HubTemplate } from '../../../common/hubTemplates';
import { StateSequence } from '../../../state-sequence';

export const getJointHubTemplate = (
  displayState: StateSequence,
  userCase: Partial<CaseWithId>,
  {
    hasApplicantAppliedForConditionalOrder = false,
    isWithinSwitchToSoleFoIntentionNotificationPeriod = false,
    hasSwitchToSoleFoIntentionNotificationPeriodExpired = false,
    isApplicantAbleToRespondToRequestForInformation = false,
  } = {}
): string | undefined => {
  switch (displayState.state()) {
    case State.FinalOrderRequested:
    case State.AwaitingGeneralConsideration:
    case State.GeneralConsiderationComplete: {
      return HubTemplate.FinalOrderRequested;
    }
    case State.AwaitingPronouncement: {
      return HubTemplate.AwaitingPronouncement;
    }
    case State.Holding:
    case State.Submitted: {
      return HubTemplate.Holding;
    }
    case State.ConditionalOrderPronounced: {
      return HubTemplate.ConditionalOrderPronounced;
    }
    case State.AwaitingClarification:
      return HubTemplate.AwaitingClarification;
    case State.ClarificationSubmitted:
      if (userCase.coIsAdminClarificationSubmitted === YesOrNo.YES) {
        return HubTemplate.AwaitingLegalAdvisorReferral;
      } else {
        return HubTemplate.ClarificationSubmitted;
      }
    case State.AwaitingAmendedApplication:
      return HubTemplate.AwaitingAmendedApplication;
    case State.ConditionalOrderPending:
      return HubTemplate.ConditionalOrderPending;
    case State.AwaitingAdminClarification:
    case State.AwaitingLegalAdvisorReferral:
    case State.ConditionalOrderReview:
    case State.LAReview:
      return HubTemplate.AwaitingLegalAdvisorReferral;
    case State.AwaitingFinalOrder:
      return HubTemplate.AwaitingFinalOrder;
    case State.AwaitingJointFinalOrder:
      if (isWithinSwitchToSoleFoIntentionNotificationPeriod) {
        return HubTemplate.IntendToSwitchToSoleFinalOrder;
      }
      if (hasSwitchToSoleFoIntentionNotificationPeriodExpired) {
        return HubTemplate.AwaitingFinalOrder;
      }
      return HubTemplate.AwaitingJointFinalOrder;
    case State.FinalOrderComplete: {
      return HubTemplate.FinalOrderComplete;
    }
    case State.PendingHearingOutcome:
    case State.PendingHearingDate: {
      return HubTemplate.PendingHearingOutcome;
    }
    case State.InformationRequested: {
      return isApplicantAbleToRespondToRequestForInformation
        ? HubTemplate.InformationRequested
        : HubTemplate.InformationRequestedFromPartnerOrOther;
    }
    case State.AwaitingRequestedInformation: {
      return isApplicantAbleToRespondToRequestForInformation
        ? HubTemplate.AwaitingRequestedInformation
        : HubTemplate.InformationRequestedFromPartnerOrOther;
    }
    case State.RequestedInformationSubmitted: {
      return isApplicantAbleToRespondToRequestForInformation
        ? HubTemplate.RespondedToInformationRequest
        : HubTemplate.InformationRequestedFromPartnerOrOther;
    }
    case State.AwaitingDocuments:
      return HubTemplate.AwaitingDocuments;
    case State.AwaitingHWFDecision:
    case State.AwaitingHWFEvidence:
      return userCase.applicant1CannotUpload === Checkbox.Checked ? HubTemplate.AwaitingDocuments : HubTemplate.Holding;
    default: {
      if (
        displayState.isAfter('Holding') &&
        displayState.isBefore('AwaitingLegalAdvisorReferral') &&
        !hasApplicantAppliedForConditionalOrder
      ) {
        return HubTemplate.ApplicantNotYetAppliedForConditionalOrder;
      }
    }
  }
};
