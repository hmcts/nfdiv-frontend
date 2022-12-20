import { CaseWithId } from '../case/case';
import { DivorceOrDissolution, State } from '../case/definition';

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

    it('returns true if FinalOrderOverdue', () => {
      userCase.state = State.FinalOrderOverdue;
      const result = needsToExplainDelay(userCase);
      expect(result).toBe(true);
    });

    it('returns false if AwaitingFinalOrder', () => {
      userCase.state = State.AwaitingFinalOrder;
      const result = needsToExplainDelay(userCase);
      expect(result).toBe(false);
    });
  });
});
