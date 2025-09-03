import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isInvalidHelpWithFeesRef } from '../../../../../app/form/validation';

const en = () => ({
  title: 'Enter your Help With Fees reference number',
  refExample: 'For example, HWF-A1B-23C',
  errors: {
    applicant1InterimAppsHwfRefNumber: {
      required: 'Help with fees reference number cannot be blank.',
      invalid: 'Enter your help with fees reference number in the correct format.',
      invalidUsedExample:
        'You have entered the example Help With Fees number. Enter the number you were sent before continuing.',
    },
  },
});

// @TODO translations
const cy: typeof en = () => ({
  title: 'Rhowch eich cyfeirnod Help i Dalu Ffioedd',
  refExample: 'Er enghraifft, HWF-A1B-23C',
  errors: {
    applicant1InterimAppsHwfRefNumber: {
      required: 'Ni all y cyfeirnod help i dalu ffioedd gael ei adael yn wag.',
      invalid: 'Rhowch eich cyfeirnod help i dalu ffioedd yn y fformat cywir.',
      invalidUsedExample:
        'Rydych wedi nodi’r rhif Help i Dalu Ffioedd sy’n cael ei ddefnyddio fel enghraifft. Nodwch y rhif a anfonwyd atoch cyn parhau.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1InterimAppsHwfRefNumber: {
      type: 'text',
      attributes: {
        maxLength: 11,
      },
      classes: 'govuk-!-width-one-third',
      label: l => l.title,
      labelHidden: true,
      hint: l => l.refExample,
      validator: isInvalidHelpWithFeesRef,
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
