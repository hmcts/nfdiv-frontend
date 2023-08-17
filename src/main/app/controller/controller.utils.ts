import { CaseWithId } from '../case/case';
import { State } from '../case/definition';

export const needsToExplainDelay = (userCase: Partial<CaseWithId>): boolean => {
  return (
    userCase.state === State.FinalOrderOverdue ||
    Boolean(userCase.applicant1FinalOrderLateExplanation) ||
    Boolean(userCase.applicant2FinalOrderLateExplanation)
  );
};
