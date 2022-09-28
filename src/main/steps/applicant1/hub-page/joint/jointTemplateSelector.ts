import { State } from '../../../../app/case/definition';
import { StateSequence } from '../../../state-sequence';

export const getJointHubTemplate = (
  displayState: StateSequence,
  hasApplicantAppliedForConditionalOrder: boolean
): string | undefined => {
  switch (displayState.state()) {
    case State.FinalOrderRequested: {
      return '/final-order-requested.njk';
    }
    case State.AwaitingPronouncement: {
      return '/awaiting-pronouncement.njk';
    }
    case State.Holding: {
      return '/holding.njk';
    }
    case State.ConditionalOrderPronounced: {
      return '/conditional-order-pronounced.njk';
    }
    case State.AwaitingClarification:
      return '/awaiting-clarification.njk';
    case State.ClarificationSubmitted:
      return '/clarification-submitted.njk';
    case State.AwaitingAmendedApplication:
      return '/awaiting-amended-application.njk';
    case State.ConditionalOrderPending:
      return '/conditional-order-pending.njk';
    case State.AwaitingLegalAdvisorReferral:
      return '/awaiting-legal-advisor-referral.njk';
    case State.AwaitingFinalOrder:
      return '/awaiting-final-order.njk';
    default: {
      if (
        displayState.isAfter('Holding') &&
        displayState.isBefore('AwaitingLegalAdvisorReferral') &&
        !hasApplicantAppliedForConditionalOrder
      ) {
        return '/applicant-not-yet-applied-for-conditional-order.njk';
      }
    }
  }
};
