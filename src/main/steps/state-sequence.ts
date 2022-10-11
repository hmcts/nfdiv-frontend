import { State } from '../app/case/definition';

export class StateSequence {
  states: State[];
  stateIndex: number;

  constructor(readonly stateList: State[]) {
    this.states = stateList;
    this.stateIndex = 0;
  }

  public at(currentState: State): StateSequence {
    const currentStateSequence: StateSequence = new StateSequence(this.states);
    currentStateSequence.stateIndex = this.states.indexOf(currentState);
    return currentStateSequence;
  }

  public state(): State {
    return this.states[this.stateIndex];
  }

  public isAfter(state: string): boolean {
    return this.stateIndex > this.states.indexOf(state as State);
  }

  public isAtOrAfter(state: string): boolean {
    return this.stateIndex >= this.states.indexOf(state as State);
  }

  public isBefore(state: string): boolean {
    return this.stateIndex < this.states.indexOf(state as State);
  }

  public isAtOrBefore(state: string): boolean {
    return this.stateIndex <= this.states.indexOf(state as State);
  }
}

export const currentStateFn = (state: State | undefined): StateSequence => {
  return new StateSequence([
    State.Draft,
    State.AwaitingApplicant2Response,
    State.AwaitingApplicant1Response,
    State.Applicant2Approved,
    State.AwaitingHWFDecision,
    State.WelshTranslationReview,
    State.AwaitingPayment,
    State.AwaitingDocuments,
    State.Submitted,
    State.AwaitingAos,
    State.AwaitingService,
    State.AosDrafted,
    State.AosOverdue,
    State.AwaitingServicePayment,
    State.AwaitingServiceConsideration,
    State.AwaitingBailiffReferral,
    State.AwaitingBailiffService,
    State.IssuedToBailiff,
    State.GeneralApplicationReceived,
    State.AwaitingGeneralReferralPayment,
    State.AwaitingGeneralConsideration,
    State.GeneralConsiderationComplete,
    State.AwaitingJudgeClarification,
    State.AwaitingDwpResponse,
    State.AwaitingAlternativeService,
    State.Holding,
    State.AwaitingConditionalOrder,
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
  ]).at(state as State);
};
