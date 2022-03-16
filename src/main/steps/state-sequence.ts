import { CaseWithId } from '../app/case/case';
import { State } from '../app/case/definition';

export class StateSequence {
  states: string[];
  stateIndex: number;

  constructor(readonly stateList: string[]) {
    this.states = stateList;
    this.stateIndex = 0;
  }

  public at(currentState: string): StateSequence {
    this.stateIndex = this.states.indexOf(currentState);
    return this;
  }

  public isAfter(state: string): boolean {
    return this.stateIndex > this.states.indexOf(state);
  }

  public isAtOrAfter(state: string): boolean {
    return this.stateIndex >= this.states.indexOf(state);
  }

  public isBefore(state: string): boolean {
    return this.stateIndex < this.states.indexOf(state);
  }
}

export const currentStateFn = (userCase: Partial<CaseWithId>): StateSequence => {
  return new StateSequence([
    State.Draft,
    State.AwaitingApplicant2Response,
    State.AwaitingApplicant1Response,
    State.Applicant2Approved,
    State.AwaitingHWFDecision,
    State.AwaitingPayment,
    State.AwaitingDocuments,
    State.Submitted,
    State.AwaitingAos,
    State.AwaitingService,
    State.AosDrafted,
    State.AosOverdue,
    State.Disputed,
    State.AwaitingServicePayment,
    State.AwaitingServiceConsideration,
    State.AwaitingBailiffReferral,
    State.AwaitingBailiffService,
    State.IssuedToBailiff,
    State.Holding,
    State.AwaitingConditionalOrder,
    State.AwaitingAlternativeService,
    State.AwaitingGeneralConsideration,
    State.AwaitingGeneralReferralPayment,
    State.GeneralConsiderationComplete,
    State.AwaitingJudgeClarification,
    State.AwaitingDwpResponse,
    State.ConditionalOrderDrafted,
    State.ConditionalOrderPending,
    State.AwaitingLegalAdvisorReferral,
    State.AwaitingAdminClarification,
    State.AwaitingClarification,
    State.ClarificationSubmitted,
    State.AwaitingAmendedApplication,
    State.AwaitingPronouncement,
    State.ConditionalOrderPronounced,
    State.ConditionalOrderRefused,
    State.AwaitingFinalOrder,
    State.FinalOrderOverdue,
    State.FinalOrderRequested,
    State.FinalOrderPending,
    State.FinalOrderComplete,
    State.Rejected,
    State.Withdrawn,
    State.NewPaperCase,
    State.OfflineDocumentReceived,
    State.BulkCaseReject,
  ]).at(userCase.state as State);
};
