import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = {
  title: 'Tracing agents search',
  tracingAgentDescription: "What were the results of your tracing agent's search?",
  uploadHint: 'You will be able to upload any evidence you have at the end of this application.',
  errors: {
    applicant1DispenseTracingAgentResults: {
      required: "Enter details about the results of the tracing agent's search",
    },
  },
};

const cy: typeof en = {
  title: 'Chwiliad asiantau olrhain',
  tracingAgentDescription: 'Beth oedd canlyniadau eich chwiliad asiant olrhain?',
  uploadHint: 'Byddwch yn gallu uwchlwytho unrhyw dystiolaeth sydd gennych ar ddiwedd y cais hwn.',
  errors: {
    applicant1DispenseTracingAgentResults: {
      required: 'Rhowch fanylion canlyniadau chwiliad yr asiant olrhain',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseTracingAgentResults: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.tracingAgentDescription,
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
