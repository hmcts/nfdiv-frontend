import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

const en = ({ generalApplicationFee }: CommonContent) => ({
  title: 'Pay the fee for this application',
  line1: `The fee for this application is ${generalApplicationFee}. Your application will not be submitted to the court until you have paid.`,
  line2:
    "You'll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready.",
  continue: 'Pay and submit application',
});

const cy: typeof en = ({ generalApplicationFee }: CommonContent) => ({
  title: 'Pay the fee for this application',
  line1: `The fee for this application is ${generalApplicationFee}. Your application will not be submitted to the court until you have paid.`,
  line2:
    "You'll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready.",
  continue: 'Pay and submit application',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);

  return {
    ...translations,
    form,
  };
};
