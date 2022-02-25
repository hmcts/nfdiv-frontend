export class StateSequence {
  states: string[];

  constructor(readonly stateList: string[]) {
    this.states = stateList;
  }

  public at(currentState: string): SequenceStage {
    return new SequenceStage(this.states, this.states.indexOf(currentState));
  }
}

export class SequenceStage {
  stateIndex: number;
  states: string[];

  constructor(readonly stateList: string[], readonly index: number) {
    this.stateIndex = index;
    this.states = stateList;
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
