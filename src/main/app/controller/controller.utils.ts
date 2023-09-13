import { CaseWithId } from '../case/case';
import { YesOrNo } from '../case/definition';

export const needsToExplainDelay = (userCase: Partial<CaseWithId>): boolean => {
  return (
    userCase.isFinalOrderOverdue === YesOrNo.YES ||
    Boolean(userCase.applicant1FinalOrderLateExplanation) ||
    Boolean(userCase.applicant2FinalOrderLateExplanation)
  );
};
