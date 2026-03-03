import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { CHECK_ANSWERS_WITHDRAW, HUB_PAGE, WITHDRAW_CONFIRMATION, WITHDRAW_THIS_APPLICATION } from './urls';
import { withdrawApplicationSequence } from './withdrawApplicationSequence';

describe('Pre Issue Withdraw Application Sequence test', () => {
  describe('WITHDRAW_THIS_APPLICATION', () => {
    test('Confirm Yes', () => {
      const caseData = {
        confirmWithdrawApplication: YesOrNo.YES,
      };
      const step = withdrawApplicationSequence.find(obj => obj.url === WITHDRAW_THIS_APPLICATION) as Step;
      expect(step.getNextStep(caseData)).toBe(CHECK_ANSWERS_WITHDRAW);
    });

    test('Confirm No', () => {
      const caseData = {
        confirmWithdrawApplication: YesOrNo.NO,
      };
      const step = withdrawApplicationSequence.find(obj => obj.url === WITHDRAW_THIS_APPLICATION) as Step;
      expect(step.getNextStep(caseData)).toBe(HUB_PAGE);
    });
  });

  describe('CHECK_ANSWERS_WITHDRAW', () => {
    test('CHECK_ANSWERS_WITHDRAW', () => {
      const step = withdrawApplicationSequence.find(obj => obj.url === CHECK_ANSWERS_WITHDRAW) as Step;
      const caseData = {};

      expect(step.getNextStep(caseData)).toBe(WITHDRAW_CONFIRMATION);
    });
  });
});
