import { State } from '../../../../app/case/definition';
import { StateSequence } from '../../../state-sequence';

export const getSoleHubTemplate = (
  displayState: StateSequence,
  isServiceApplicationGranted: boolean,
  isSuccessfullyServedByBailiff: boolean,
  isAlternativeService: boolean
): string => {
  switch (displayState.state()) {
    case State.FinalOrderRequested: {
      return '/final-order-requested.njk';
    }
    case State.AwaitingServiceConsideration:
    case State.AwaitingBailiffReferral: {
      return '/awaiting-service-consideration-or-awaiting-bailiff-referral.njk';
    }
    case State.ConditionalOrderPronounced: {
      return '/conditional-order-pronounced.njk';
    }
    case State.AwaitingLegalAdvisorReferral:
    case State.AwaitingPronouncement:
      return '/awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk';
    case State.AwaitingGeneralConsideration:
      return '/awaiting-general-consideration.njk';
    case State.AwaitingConditionalOrder:
      return '/awaiting-conditional-order.njk';
    case State.Holding:
      return '/holding.njk';
    case State.AwaitingClarification:
      return '/awaiting-clarification.njk';
    case State.ClarificationSubmitted:
      return '/clarification-submitted.njk';
    case State.AwaitingBailiffService:
      return '/awaiting-bailiff-service.njk';
    case State.AwaitingFinalOrder:
    case State.FinalOrderOverdue:
      return '/awaiting-final-order-or-final-order-overdue.njk';
    case State.AwaitingAos:
      if (isServiceApplicationGranted && !isSuccessfullyServedByBailiff) {
        return '/bailiff-service-unsuccessful.njk';
      } else if (isAlternativeService && !isServiceApplicationGranted) {
        return '/service-application-rejected.njk';
      } else {
        return '/aos-awaiting-or-drafted.njk';
      }
    default: {
      if (displayState.isAfter('AosDrafted') && displayState.isBefore('Holding')) {
        return '/aos-due.njk';
      }
      return '/aos-awaiting-or-drafted.njk';
    }
  }
};
