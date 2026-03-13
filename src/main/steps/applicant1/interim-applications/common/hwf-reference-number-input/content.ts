import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isInvalidHelpWithFeesRef } from '../../../../../app/form/validation';

const en = () => {
  const hwfRefNumberErrors = {
    required: 'Help with fees reference number cannot be blank.',
    invalid: 'Enter your help with fees reference number in the correct format.',
    invalidUsedExample:
      'You have entered the example Help With Fees number. Enter the number you were sent before continuing.',
  };

  return {
    title: 'Enter your Help With Fees reference number',
    refExample: 'For example, HWF-A1B-23C',
    errors: {
      applicant1InterimAppsHwfRefNumber: hwfRefNumberErrors,
      applicant2InterimAppsHwfRefNumber: hwfRefNumberErrors,
    },
  };
};

// @TODO translations
const cy: typeof en = () => {
  const hwfRefNumberErrors = {
    required: 'Ni all y cyfeirnod help i dalu ffioedd gael ei adael yn wag.',
    invalid: 'Rhowch eich cyfeirnod help i dalu ffioedd yn y fformat cywir.',
    invalidUsedExample:
      'Rydych wedi nodi’r rhif Help i Dalu Ffioedd sy’n cael ei ddefnyddio fel enghraifft. Nodwch y rhif a anfonwyd atoch cyn parhau.',
  };

  return {
    title: 'Rhowch eich cyfeirnod Help i Dalu Ffioedd',
    refExample: 'Er enghraifft, HWF-A1B-23C',
    errors: {
      applicant1InterimAppsHwfRefNumber: hwfRefNumberErrors,
      applicant2InterimAppsHwfRefNumber: hwfRefNumberErrors,
    },
  };
};

const languages = {
  en,
  cy,
};

const helpWithFeesReferenceField = () => ({
  type: 'text',
  attributes: {
    maxLength: 11,
  },
  classes: 'govuk-!-width-one-third',
  label: l => l.title,
  labelHidden: true,
  hint: l => l.refExample,
  validator: isInvalidHelpWithFeesRef,
});

export const form: FormContent = {
  fields: {
    applicant1InterimAppsHwfRefNumber: helpWithFeesReferenceField(),
  },
  submit: {
    text: l => l.continue,
  },
};

export const applicant2Form: FormContent = {
  ...form,
  fields: {
    applicant2InterimAppsHwfRefNumber: helpWithFeesReferenceField(),
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const isApplicant2 = content.isApplicant2;

  return {
    ...translations,
    form: isApplicant2 ? applicant2Form : form,
  };
};
