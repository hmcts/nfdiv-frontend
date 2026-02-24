import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { applicant2WithdrawApplicationSequence } from './applicant2WithdrawApplicationSequence';
import { CHECK_ANSWERS_WITHDRAW, HUB_PAGE, WITHDRAW_CONFIRMATION, WITHDRAW_THIS_APPLICATION } from './urls';

describe('Pre Issue Withdraw Application Sequence test', () => {
  describe('WITHDRAW_THIS_APPLICATION', () => {
    test('Confirm Yes', () => {
      const caseData = {
        applicant2ConfirmWithdrawApplication: YesOrNo.YES,
      };
      const step = applicant2WithdrawApplicationSequence.find(obj => obj.url === WITHDRAW_THIS_APPLICATION) as Step;
      expect(step.getNextStep(caseData)).toBe(CHECK_ANSWERS_WITHDRAW);
    });

    test('Confirm No', () => {
      const caseData = {
        applicant2ConfirmWithdrawApplication: YesOrNo.NO,
      };
      const step = applicant2WithdrawApplicationSequence.find(obj => obj.url === WITHDRAW_THIS_APPLICATION) as Step;
      expect(step.getNextStep(caseData)).toBe(HUB_PAGE);
    });
  });

  describe('CHECK_ANSWERS_WITHDRAW', () => {
    test('CHECK_ANSWERS_WITHDRAW', () => {
      const step = applicant2WithdrawApplicationSequence.find(obj => obj.url === CHECK_ANSWERS_WITHDRAW) as Step;
      const caseData = {};

      expect(step.getNextStep(caseData)).toBe(WITHDRAW_CONFIRMATION);
    });
  });
});
