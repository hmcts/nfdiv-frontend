import { CaseWithId } from '../../../../app/case/case';
import { State, YesOrNo } from '../../../../app/case/definition';
import { StateSequence } from '../../../state-sequence';

export const getJointHubTemplate = (
  displayState: StateSequence,
  userCase: Partial<CaseWithId>,
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
      if (userCase.coIsAdminClarificationSubmitted === YesOrNo.YES) {
        return '/awaiting-legal-advisor-referral.njk';
      } else {
        return '/clarification-submitted.njk';
      }
    case State.AwaitingAmendedApplication:
      return '/awaiting-amended-application.njk';
    case State.ConditionalOrderPending:
      return '/conditional-order-pending.njk';
    case State.AwaitingAdminClarification:
    case State.AwaitingLegalAdvisorReferral:
      return '/awaiting-legal-advisor-referral.njk';
    case State.FinalOrderOverdue:
    case State.AwaitingJointFinalOrder:
    case State.AwaitingFinalOrder:
      return '/awaiting-final-order.njk';
    case State.FinalOrderComplete: {
      return '/final-order-complete.njk';
    }
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
