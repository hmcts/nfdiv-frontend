import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import type { CommonContent } from '../../common/common.content';

const en = ({ partner, isDivorce }: CommonContent) => {
  const partnership = isDivorce ? 'the divorce' : 'ending the civil partnership';
  const separatingFrom = isDivorce ? 'Divorcing' : 'Ending your civil partnership with';
  return {
    title: `${separatingFrom} someone who lives outside of England and Wales`,
    line1: `The address you have provided for your ${partner} is outside of England and Wales. That means you are responsible for ‘serving’ (sending) the court documents, which notify your ${partner} about ${partnership}.`,
    line2: `You will receive the documents that you need to send to your ${partner} after you have submitted this application.`,
  };
};

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
