import { isEmpty } from 'lodash';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Tell us about your evidence',
  line1: `Give as much detail as you can. The judge needs to be satisfied that your ${partner} has received the papers before they can grant your application. If your upload does not show the date you'll need to explain when you got it.`,
  errors: {
    applicant1DeemedEvidenceDetails: {
      required: 'You must provide a statement before continuing.',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: 'Tell us about your evidence',
  line1: `Give as much detail as you can. The judge needs to be satisfied that your ${partner} has received the papers before they can grant your application. If your upload does not show the date you'll need to explain when you got it.`,
  errors: {
    applicant1DeemedEvidenceDetails: {
      required: 'You must provide a statement before continuing.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1DeemedEvidenceDetails: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.title,
      labelHidden: true,
      validator: value => {
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
