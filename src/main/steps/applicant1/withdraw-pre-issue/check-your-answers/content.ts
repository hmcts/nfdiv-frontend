import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import { APPLICANT_2, WITHDRAW_THIS_APPLICATION } from '../../../urls';

const en = ({ isApplicant2 }: CommonContent, confirmWithdrawApplication, withdrawApplicationReason) => ({
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
    confirmWithdraw: `${isApplicant2 ? APPLICANT_2 : '' + WITHDRAW_THIS_APPLICATION}`,
    withdrawApplicationReason: `${isApplicant2 ? APPLICANT_2 : '' + WITHDRAW_THIS_APPLICATION}`,
  },
  submitText: 'Withdraw application',
});

const cy: typeof en = ({ isApplicant2 }: CommonContent, confirmWithdrawApplication, withdrawApplicationReason) => ({
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
    confirmWithdraw: `${isApplicant2 ? APPLICANT_2 : '' + WITHDRAW_THIS_APPLICATION}`,
    withdrawApplicationReason: `${isApplicant2 ? APPLICANT_2 : '' + WITHDRAW_THIS_APPLICATION}`,
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
  const confirmWithdrawApplication = content.userCase.confirmWithdrawApplication;
  const withdrawApplicationReason = content.userCase.withdrawApplicationReason;
  const translations = languages[content.language](content, confirmWithdrawApplication, withdrawApplicationReason);
  const showChangeLink = true;
  return {
    ...translations,
    form,
    confirmWithdrawApplication,
    withdrawApplicationReason,
    showChangeLink,
  };
};
