import dayjs from 'dayjs';

import { CaseWithId } from '../../../../app/case/case';
import { State, YesOrNo } from '../../../../app/case/definition';
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
    userCase.alternativeServiceOutcomes?.[0].value.serviceApplicationRefusalReason === 'refusalOrderToApplicant';

  switch (displayState.state()) {
    case State.RespondentFinalOrderRequested:
    case State.FinalOrderRequested: {
      return HubTemplate.FinalOrderRequested;
    }
    case State.AwaitingServiceConsideration:
    case State.AwaitingBailiffReferral: {
      return HubTemplate.AwaitingServiceConsiderationOrAwaitingBailiffReferral;
    }
    case State.ConditionalOrderPronounced: {
      return HubTemplate.ConditionalOrderPronounced;
    }
    case State.AwaitingAdminClarification:
    case State.AwaitingLegalAdvisorReferral:
    case State.AwaitingPronouncement:
      return HubTemplate.AwaitingLegalAdvisorReferralOrAwaitingPronouncement;
    case State.AwaitingGeneralConsideration:
      if (userCase.aosStatementOfTruth) {
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
    case State.FinalOrderOverdue:
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
        return HubTemplate.AosAwaitingOrDrafted;
      }
    default: {
      if (displayState.isAfter('AosDrafted') && displayState.isBefore('Holding')) {
        return HubTemplate.AoSDue;
      }
      return HubTemplate.AosAwaitingOrDrafted;
    }
  }
};
