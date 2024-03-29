import { CaseWithId } from '../../../app/case/case';
import { State } from '../../../app/case/definition';
import { HubTemplate } from '../../common/hubTemplates';
import { StateSequence } from '../../state-sequence';

export const getRespondentHubTemplate = (
  displayState: StateSequence,
  userCase: Partial<CaseWithId>,
  hasSubmittedAos: boolean
): string | undefined => {
  switch (displayState.state()) {
    case State.RespondentFinalOrderRequested:
    case State.FinalOrderRequested: {
      return HubTemplate.FinalOrderRequested;
    }
    case State.AwaitingFinalOrder: {
      return HubTemplate.AwaitingFinalOrderOrFinalOrderOverdue;
    }
    case State.ConditionalOrderPronounced: {
      return HubTemplate.ConditionalOrderPronounced;
    }
    case State.ClarificationSubmitted:
      return HubTemplate.ClarificationSubmitted;
    case State.AwaitingLegalAdvisorReferral:
    case State.LAReview:
    case State.AwaitingPronouncement:
      return HubTemplate.AwaitingLegalAdvisorReferralOrAwaitingPronouncement;
    case State.AwaitingAmendedApplication:
      return HubTemplate.AwaitingAmendedApplication;
    case State.FinalOrderComplete:
      return HubTemplate.FinalOrderComplete;
    case State.AwaitingGeneralConsideration:
      if (userCase.dateFinalOrderSubmitted) {
        return HubTemplate.FinalOrderRequested;
      } else if (userCase.aosStatementOfTruth) {
        return HubTemplate.AwaitingGeneralConsideration;
      } else {
        return HubTemplate.AwaitingAoS;
      }
    case State.Holding:
      if (!hasSubmittedAos) {
        return HubTemplate.AwaitingAoS;
      }
      return HubTemplate.Holding;
    default: {
      if (displayState.isAtOrBefore('AwaitingConditionalOrder') && !hasSubmittedAos) {
        return HubTemplate.AwaitingAoS;
      }
    }
  }
};
