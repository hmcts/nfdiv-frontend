import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = {
  title: 'Online tracing results',
  tracingOnlineDescription: 'What were the results of your online searches?',
  uploadHint: 'You will be able to upload any evidence you have at the end of this application.',
  errors: {
    applicant1DispenseTracingOnlineResults: {
      required: 'Enter details about the results of your online searches',
    },
  },
};

const cy: typeof en = {
  title: 'Canlyniadau olrhain ar-lein',
  tracingOnlineDescription: 'Beth oedd canlyniadau eich chwiliadau ar-lein?',
  uploadHint: 'You will be able to upload any evidence you have at the end of this application.',
  errors: {
    applicant1DispenseTracingOnlineResults: {
      required: 'Eglurwch ganlyniadau eich chwiliadau ar-lein',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseTracingOnlineResults: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.tracingOnlineDescription,
      labelHidden: true,
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
