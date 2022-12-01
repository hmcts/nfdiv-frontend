import { CaseWithId } from '../../../app/case/case';
import { State } from '../../../app/case/definition';
import { HubTemplate } from '../../applicant1/hub-page/hubTemplates';
import { StateSequence } from '../../state-sequence';

export const getRespondentHubTemplate = (
  displayState: StateSequence,
  userCase: Partial<CaseWithId>,
  hasSubmittedAos: boolean
): string | undefined => {
  switch (displayState.state()) {
    case State.FinalOrderRequested: {
      return HubTemplate.FinalOrderRequested;
    }
    case State.AwaitingFinalOrder:
    case State.FinalOrderOverdue: {
      return HubTemplate.AwaitingFinalOrderOrFinalOrderOverdue;
    }
    case State.ConditionalOrderPronounced: {
      return HubTemplate.ConditionalOrderPronounced;
    }
    case State.ClarificationSubmitted:
      return HubTemplate.ClarificationSubmitted;
    case State.AwaitingLegalAdvisorReferral:
    case State.AwaitingPronouncement:
      return HubTemplate.AwaitingLegalAdvisorReferralOrAwaitingPronouncement;
    case State.AwaitingAmendedApplication:
      return HubTemplate.AwaitingAmendedApplication;
    case State.FinalOrderComplete:
      return HubTemplate.FinalOrderComplete;
    case State.AwaitingGeneralConsideration:
      if (userCase.aosStatementOfTruth) {
        return HubTemplate.AwaitingGeneralConsideration;
      } else {
        return HubTemplate.AwaitingAoS;
      }
    case State.Holding:
      return HubTemplate.Holding;
    default: {
      if (displayState.isAtOrBefore('AwaitingConditionalOrder') && !hasSubmittedAos) {
        return HubTemplate.AwaitingAoS;
      }
    }
  }
};
