import { CaseWithId } from '../../../../app/case/case';
import { State, YesOrNo } from '../../../../app/case/definition';
import { StateSequence } from '../../../state-sequence';
import { HubTemplate } from '../hubTemplates';

export const getJointHubTemplate = (
  displayState: StateSequence,
  userCase: Partial<CaseWithId>,
  hasApplicantAppliedForConditionalOrder = false,
  withinSwitchToSoleFinalOrderNotificationWindow = false
): string | undefined => {
  switch (displayState.state()) {
    case State.FinalOrderRequested: {
      return HubTemplate.FinalOrderRequested;
    }
    case State.AwaitingPronouncement: {
      return HubTemplate.AwaitingPronouncement;
    }
    case State.Holding: {
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
      return HubTemplate.AwaitingLegalAdvisorReferral;
    case State.FinalOrderOverdue:
    case State.AwaitingFinalOrder:
      return HubTemplate.AwaitingFinalOrder;
    case State.AwaitingJointFinalOrder:
      if (withinSwitchToSoleFinalOrderNotificationWindow) {
        return HubTemplate.IntendToSwitchToSoleFinalOrder;
      }
      return HubTemplate.AwaitingJointFinalOrder;
    case State.FinalOrderComplete: {
      return HubTemplate.FinalOrderComplete;
    }
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
