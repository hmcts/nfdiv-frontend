import { CaseWithId } from '../app/case/case';
import { CcdV1Response } from '../app/case/case-api-client';
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

export const currentStateFn = (userCase: Partial<CaseWithId>): StateSequence => {
  return new StateSequence(orderedStateSequence).at(userCase.state as State);
};

export const orderedStateSequence: State[] = [
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
];

export const preSubmittedStatePrioritySequence: State[] = orderedStateSequence.slice(
  0,
  orderedStateSequence.indexOf(State.Submitted)
);

export const getHighestPriorityPreSubmissionCases = (userCases: CcdV1Response[]): CcdV1Response[] => {
  if (userCases.some(userCase => !preSubmittedStatePrioritySequence.includes(userCase.state))) {
    throw new Error('At least one of the userCases is not in a pre-submitted state');
  }
  const stateIndexArr = userCases.map(userCase => preSubmittedStatePrioritySequence.indexOf(userCase.state));
  const highestPriorityStateIndex: number = Math.max(...stateIndexArr);
  return userCases.filter(
    userCase => preSubmittedStatePrioritySequence.indexOf(userCase.state) === highestPriorityStateIndex
  );
};
