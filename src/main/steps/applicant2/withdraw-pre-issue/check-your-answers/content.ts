import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { APPLICANT_2, WITHDRAW_THIS_APPLICATION } from '../../../urls';

const en = (confirmWithdrawApplication, withdrawApplicationReason) => ({
  title: 'Check your answers',
  stepQuestions: {
    confirmWithdraw: 'Are you sure you want to withdraw this application?',
    withdrawApplicationReason: 'What is your reason for withdrawing the application?',
  },
  stepAnswers: {
    confirmWithdraw: `${confirmWithdrawApplication === YesOrNo.YES ? 'Yes' : 'No'}`,
    withdrawApplicationReason: `${withdrawApplicationReason || ''}`,
  },
  stepLinks: {
    confirmWithdraw: `${APPLICANT_2}${WITHDRAW_THIS_APPLICATION}`,
    withdrawApplicationReason: `${APPLICANT_2}${WITHDRAW_THIS_APPLICATION}`,
  },
  submitText: 'Withdraw application',
});

const cy: typeof en = (confirmWithdrawApplication, withdrawApplicationReason) => ({
  title: 'Check your answers',
  stepQuestions: {
    confirmWithdraw: 'Are you sure you want to withdraw this application?',
    withdrawApplicationReason: 'What is your reason for withdrawing the application?',
  },
  stepAnswers: {
    confirmWithdraw: `${confirmWithdrawApplication === YesOrNo.YES ? 'Yes' : 'No'}`,
    withdrawApplicationReason: `${withdrawApplicationReason || ''}`,
  },
  stepLinks: {
    confirmWithdraw: `${APPLICANT_2}${WITHDRAW_THIS_APPLICATION}`,
    withdrawApplicationReason: `${APPLICANT_2}${WITHDRAW_THIS_APPLICATION}`,
  },
  submitText: 'Withdraw application',
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.submitText,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const confirmWithdrawApplication = content.userCase.applicant2ConfirmWithdrawApplication;
  const withdrawApplicationReason = content.userCase.applicant2WithdrawApplicationReason;
  const translations = languages[content.language](confirmWithdrawApplication, withdrawApplicationReason);
  const showChangeLink = true;
  return {
    ...translations,
    form,
    confirmWithdrawApplication,
    withdrawApplicationReason,
    showChangeLink,
  };
};
