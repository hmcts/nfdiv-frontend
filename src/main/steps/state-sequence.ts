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
