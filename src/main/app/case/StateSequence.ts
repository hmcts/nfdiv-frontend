export class StateSequence {
  states: string[];

  constructor(readonly stateList: string[]) {
    this.states = stateList;
  }

  public at(currentState: string): SequenceStage {
    return new SequenceStage(this.states, currentState);
  }
}

export class SequenceStage {
  currentState: string;
  states: string[];

  constructor(readonly stateList: string[], readonly state: string) {
    this.currentState = state;
    this.states = stateList;
  }

  public isAfter(state: string): boolean {
    return this.states.indexOf(this.currentState) > this.states.indexOf(state);
  }

  public isSameOrAfter(state: string): boolean {
    return this.states.indexOf(this.currentState) >= this.states.indexOf(state);
  }

  public isBefore(state: string): boolean {
    return this.states.indexOf(this.currentState) < this.states.indexOf(state);
  }
}
