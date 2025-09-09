import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = {
  title: 'Tracing agents search',
  tracingAgentDescription: "What were the results of your tracing agent's search?",
  errors: {
    applicant1DispenseTracingAgentResults: {
      required: "Enter details about the results of the tracing agent's search",
    },
  },
};

const cy: typeof en = {
  title: 'Tracing agents search',
  tracingAgentDescription: "What were the results of your tracing agent's search?",
  errors: {
    applicant1DispenseTracingAgentResults: {
      required: "Enter details about the results of the tracing agent's search",
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
