import striptags from 'striptags';

import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { WITHDRAW_THIS_APPLICATION } from '../../../urls';
import { withdrawApplicationAnswers as withdrawApplicationLabels } from '../withdraw-this-application/content';

const en = (confirmWithdrawApplication, withdrawApplicationReason) => ({
  title: 'Check your answers',
  stepQuestions: {
    confirmWithdraw: 'Are you sure you want to withdraw this application?',
    withdrawApplicationReason: 'What is your reason for withdrawing the application?',
  },
  stepAnswers: {
    confirmWithdraw: striptags(withdrawApplicationLabels.en[confirmWithdrawApplication]),
    withdrawApplicationReason: `${withdrawApplicationReason || ''}`,
  },
  stepLinks: {
    confirmWithdraw: `${WITHDRAW_THIS_APPLICATION}`,
    withdrawApplicationReason: `${WITHDRAW_THIS_APPLICATION}`,
  },
  submitText: 'Withdraw application',
});

const cy: typeof en = (confirmWithdrawApplication, withdrawApplicationReason) => ({
  title: 'Gwirio eich atebion',
  stepQuestions: {
    confirmWithdraw: 'Ydych chi’n siŵr eich bod eisiau tynnu’r cais hwn yn ôl?',
    withdrawApplicationReason: 'Beth yw eich rheswm dros dynnu’r cais yn ôl?',
  },
  stepAnswers: {
    confirmWithdraw: striptags(withdrawApplicationLabels.cy[confirmWithdrawApplication]),
    withdrawApplicationReason: `${withdrawApplicationReason || ''}`,
  },
  stepLinks: {
    confirmWithdraw: `${WITHDRAW_THIS_APPLICATION}`,
    withdrawApplicationReason: `${WITHDRAW_THIS_APPLICATION}`,
  },
  submitText: "Tynnu'r cais yn ôl",
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.submitText,
    classes: 'govuk-button govuk-button--warning',
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const confirmWithdrawApplication = content.userCase.confirmWithdrawApplication;
  const withdrawApplicationReason = content.userCase.withdrawApplicationReason;
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
