import { CaseWithId } from '../case/case';
import { DivorceOrDissolution, State, YesOrNo } from '../case/definition';

import { needsToExplainDelay } from './controller.utils';

describe('Controller utils', () => {
  describe('needsToExplainDelay', () => {
    let userCase;
    beforeEach(() => {
      userCase = {
        id: '123',
        state: State.Draft,
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      } as Partial<CaseWithId>;
    });

    it('returns true if Final Order overdue', () => {
      userCase.isFinalOrderOverdue = YesOrNo.YES;
      const result = needsToExplainDelay(userCase);
      expect(result).toBe(true);
    });

    it('returns true if applicant1FinalOrderLateExplanation defined', () => {
      userCase.applicant1FinalOrderLateExplanation = 'Test string';
      const result = needsToExplainDelay(userCase);
      expect(result).toBe(true);
    });

    it('returns true if applicant2FinalOrderLateExplanation defined', () => {
      userCase.applicant2FinalOrderLateExplanation = 'Test string';
      const result = needsToExplainDelay(userCase);
      expect(result).toBe(true);
    });

    it('returns false if AwaitingFinalOrder and no delay reasons provided', () => {
      userCase.state = State.AwaitingFinalOrder;
      const result = needsToExplainDelay(userCase);
      expect(result).toBe(false);
    });
  });
});
