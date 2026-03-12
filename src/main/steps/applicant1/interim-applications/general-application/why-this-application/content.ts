import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => {
  const genAppReasonErrors = {
    required: 'You must explain why you are making this application.',
  }

  return {
    title: 'Why are you making this application?',
    line1: 'Provide as much information as you can. This will help the court decide whether to grant your application.',
    errors: {
      applicant1GenAppReason: genAppReasonErrors,
      applicant2GenAppReason: genAppReasonErrors,
    },
  }
};

// @TODO translations
const cy = () => {
  const genAppReasonErrors = {
    required: 'You must explain why you are making this application.',
  }

  return {
    title: 'Why are you making this application?',
    line1: 'Provide as much information as you can. This will help the court decide whether to grant your application.',
    errors: {
      applicant1GenAppReason: genAppReasonErrors,
      applicant2GenAppReason: genAppReasonErrors,
    },
  }
};

const languages = {
  en,
  cy,
};

const genAppReasonField = () => ({
  type: 'textarea',
  classes: 'govuk-input--width-40',
  label: l => l.title,
  labelHidden: true,
  validator: value => isFieldFilledIn(value),
});

export const form: FormContent = {
  fields: {
    applicant1GenAppReason: genAppReasonField(),
  },
  submit: {
    text: l => l.continue,
  },
};

export const applicant2Form: FormContent = {
  ...form,
  fields: {
    applicant2GenAppReason: genAppReasonField(),
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form: content.isApplicant2 ? applicant2Form : form,
  };
};
