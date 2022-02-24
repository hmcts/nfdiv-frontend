export class CaseStates {
  states: string[];

  constructor(readonly stateList: string[]) {
    this.states = stateList;
  }

  public get(currentState: string): CaseState {
    return new CaseState(this.states, currentState);
  }
}

export class CaseState {
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
    return this.states.indexOf(this.currentState) > this.states.indexOf(state);
  }

  public isBefore(state: string): boolean {
    return this.states.indexOf(this.currentState) < this.states.indexOf(state);
  }

  public isBetween(startState: string, endState: string): boolean {
    return this.isSameOrAfter(startState) && this.isBefore(endState);
  }
}
