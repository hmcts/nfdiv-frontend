import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { CommonContent } from '../common/common.content';

const en = ({ isDivorce, divorce, endingCivilPartnership, formState }: CommonContent) => ({
  title: 'How to apply to serve (deliver) the papers another way',
  line1: `You have to make a separate application to serve the ${
    isDivorce ? divorce : endingCivilPartnership
  } papers another way. You will be given a link to the form after you have submitted this application. It will be reviewed by a judge and costs an additional £50.`,
  line3: `For example, you could apply to have the papers served (delivered) by ${
    formState?.respondentEmailAddress ? 'the email address you entered earlier' : 'email, text message or social media'
  }.`,
  line4: `Continue with your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
