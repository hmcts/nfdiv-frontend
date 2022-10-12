import { CaseWithId } from '../../../app/case/case';
import { State } from '../../../app/case/definition';
import { StateSequence } from '../../state-sequence';

export const getRespondentHubTemplate = (
  displayState: StateSequence,
  userCase: Partial<CaseWithId>,
  hasSubmittedAos: boolean
): string | undefined => {
  switch (displayState.state()) {
    case State.FinalOrderRequested: {
      return '/final-order-requested.njk';
    }
    case State.AwaitingFinalOrder:
    case State.FinalOrderOverdue: {
      return '/awaiting-final-order-or-final-order-overdue.njk';
    }
    case State.FinalOrderComplete: {
      return '../../../../applicant1/hub-page/common/latest-update-content/final-order-complete.njk';
    }
    case State.ConditionalOrderPronounced: {
      return '/conditional-order-pronounced.njk';
    }
    case State.ClarificationSubmitted:
      return '/clarification-submitted.njk';
    case State.AwaitingLegalAdvisorReferral:
    case State.AwaitingPronouncement:
      return '/awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk';
    case State.AwaitingAmendedApplication:
      return '/awaiting-amended-application.njk';
    case State.AwaitingGeneralConsideration:
      if (userCase.aosStatementOfTruth) {
        return '/awaiting-general-consideration.njk';
      } else {
        return '/awaiting-aos.njk';
      }
    case State.Holding:
      return '/holding.njk';
    default: {
      if (displayState.isAtOrBefore('AwaitingConditionalOrder') && !hasSubmittedAos) {
        return '/awaiting-aos.njk';
      }
    }
  }
};
