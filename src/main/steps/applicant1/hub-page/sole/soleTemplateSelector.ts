import dayjs from 'dayjs';

import { CaseWithId } from '../../../../app/case/case';
import { State, YesOrNo } from '../../../../app/case/definition';
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
  switch (displayState.state()) {
    case State.FinalOrderRequested: {
      return '/final-order-requested.njk';
    }
    case State.FinalOrderComplete: {
      return '/final-order-complete.njk';
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
      if (userCase.aosStatementOfTruth) {
        return '/awaiting-general-consideration.njk';
      } else if (isAosOverdue) {
        return '/aos-due.njk';
      } else {
        return '/aos-awaiting-or-drafted.njk';
      }
    case State.AwaitingConditionalOrder:
      return '/awaiting-conditional-order.njk';
    case State.Holding:
      return '/holding.njk';
    case State.AwaitingClarification:
      return '/awaiting-clarification.njk';
    case State.ClarificationSubmitted:
      return '/clarification-submitted.njk';
    case State.AwaitingAmendedApplication:
      return '/awaiting-amended-application.njk';
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
