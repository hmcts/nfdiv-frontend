import { isEmpty } from 'lodash';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner, isDivorce}: CommonContent) => ({
  title: 'Provide a statement',
  line1: `Tell us how you know your ${partner} has received the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }.`,
  line2: 'You should also explain why you have been unable to upload evidence.',
  line3: `Give as much detail as you can. The judge needs to be satisfied that your ${partner} has received the papers before they can grant your application.`,
  errors: {
    applicant1DeemedNoEvidenceStatement: {
      required: 'You have not provided any information. You need to provide the information the court has requested.',
    },
  },
});

const cy: typeof en = ({ partner, isDivorce}: CommonContent) => ({
  title: 'Provide a statement',
  line1: `Tell us how you know your ${partner} has received the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }.`,
  line2: 'You should also explain why you have been unable to upload evidence.',
  line3: `Give as much detail as you can. The judge needs to be satisfied that your ${partner} has received the papers before they can grant your application.`,
  errors: {
    applicant1DeemedNoEvidenceStatement: {
      required: 'You have not provided any information. You need to provide the information the court has requested.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1DeemedNoEvidenceStatement: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.responseLabel,
      validator: (value) => {
        const hasEnteredDetails = !isEmpty(value);
        if (!hasEnteredDetails) {
          return 'required';
        }
      },
    },
  },
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
