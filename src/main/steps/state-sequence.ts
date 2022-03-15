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
    State.AwaitingAos,
    State.AosDrafted,
    State.AosOverdue,
    State.AwaitingServicePayment,
    State.AwaitingServiceConsideration,
    State.AwaitingBailiffReferral,
    State.AwaitingBailiffService,
    State.IssuedToBailiff,
    State.Holding,
    State.AwaitingConditionalOrder,
    State.AwaitingGeneralConsideration,
    State.ConditionalOrderDrafted,
    State.ConditionalOrderPending,
    State.AwaitingLegalAdvisorReferral,
    State.AwaitingClarification,
    State.ClarificationSubmitted,
    State.AwaitingAmendedApplication,
    State.AwaitingPronouncement,
    State.ConditionalOrderPronounced,
    State.AwaitingFinalOrder,
    State.FinalOrderOverdue,
    State.FinalOrderRequested,
    State.FinalOrderPending,
    State.FinalOrderComplete,
  ]).at(userCase.state as State);
};
