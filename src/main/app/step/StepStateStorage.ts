export interface StepStateStorage {
  getCurrentState(): SessionState;
  store(state: SessionState): void;
}

export type SessionState = Record<string, unknown>;
