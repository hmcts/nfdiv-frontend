import { CaseWithId } from '../case/case';
import { State } from '../case/definition';

export const needsToExplainDelay = (userCase: Partial<CaseWithId>): boolean => {
  // This should be expanded upon in NFDIV-3138.
  return userCase.state === State.FinalOrderOverdue;
};
