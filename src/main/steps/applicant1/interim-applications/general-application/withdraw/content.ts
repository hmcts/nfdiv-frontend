import type { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce }: CommonContent) => ({
  title: 'Withdraw your application',
  line1: `Your application to the court will be withdrawn, and you will have to make a new application. This will not affect your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  withdrawApplication: 'Withdraw application',
});

const cy: typeof en = ({ isDivorce }: CommonContent) => ({
  title: 'Withdraw your application',
  line1: `Your application to the court will be withdrawn, and you will have to make a new application. This will not affect your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  withdrawApplication: "Tynnu'r cais yn ôl",
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.withdrawApplication,
    classes: 'govuk-button govuk-button--warning',
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return {
    ...languages[content.language](content),
    form,
  };
};
