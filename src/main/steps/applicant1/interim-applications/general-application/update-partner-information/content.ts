import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner, contactWebForm }: CommonContent) => ({
  title: `We need up to date information for your ${partner}`,
  line1: `We need up to date contact details so that we can send the application to your ${partner}.`,
  line2: `You can <a class="govuk-link" target="_blank" href="${contactWebForm}">update their details using our online form (opens in a new tab)</a>.`,
  line3: `You could also contact your ${partner} and ask them to update their details, if it’s safe to do so.`,
});

const cy = ({ partner, contactWebForm }: CommonContent) => ({
  title: `We need up to date information for your ${partner}`,
  line1: `We need up to date contact details so that we can send the application to your ${partner}.`,
  line2: `You can <a class="govuk-link" target="_blank" href="${contactWebForm}">update their details using our online form (opens in a new tab)</a>.`,
  line3: `You could also contact your ${partner} and ask them to update their details, if it’s safe to do so.`,
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
