import { isEmpty } from 'lodash';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

const en = () => ({
  title: 'Why are you applying for alternative service?',
  line1:
    'Explain why you have not been able to send the papers. Give as much detail as you can. This information may be considered by a judge as part of your application.',
  errors: {
    applicant1AltServiceReasonForApplying: {
      required: 'You must explain why you are applying for alternative service.',
    },
  },
});

// @TODO translations
const cy = () => ({
  title: 'Pam ydych yn gwneud cais am gyflwyno amgen?',
  line1:
    'Eglurwch pam nad ydych wedi gallu anfon y papurau. Rhowch gymaint o fanylion â phosib. Efallai y bydd y wybodaeth hon yn cael ei hystyried gan farnwr fel rhan o’ch cais.',
  errors: {
    applicant1AltServiceReasonForApplying: {
      required: 'Rhaid i chi egluro pam eich bod yn gwneud cais am gyflwyno amgen.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1AltServiceReasonForApplying: {
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
