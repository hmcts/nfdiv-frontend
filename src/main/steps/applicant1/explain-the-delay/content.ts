import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = {
  title: 'Explain the delay',
  finalOrderLateExplanation:
    'You are making this application for a final order over one year from when the conditional order was made. ' +
    'Explain to the court why you did not apply for a final order earlier. Your answer will be reviewed as part of your application.',
  finalOrderStatementOfTruth: 'I believe that the facts stated in this application are true',
  confirmApplicationIsTrueMoreInformation:
    'This confirms that the information you are submitting is true and accurate, to the best of your knowledge. ' +
    'It’s known as your ‘statement of truth’.',
  errors: {
    applicant1FinalOrderLateExplanation: {
      required:
        'You have not entered any information. You need to explain why your application has been delayed before continuing.',
    },
    applicant1FinalOrderStatementOfTruth: {
      required:
        'You have not confirmed you believe the information you have entered is true. Confirm you believe it’s true before continuing.',
    },
  },
};

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    applicant1FinalOrderLateExplanation: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.finalOrderLateExplanation,
      labelSize: 'normal',
      validator: isFieldFilledIn,
    },
    applicant1FinalOrderStatementOfTruth: {
      type: 'checkboxes',
      values: [
        {
          name: 'applicant1FinalOrderStatementOfTruth',
          label: l => l.finalOrderStatementOfTruth,
          value: Checkbox.Checked,
          selected: false,
          validator: isFieldFilledIn,
        },
      ],
    },
  },
  submit: {
    text: l => l.submit,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
