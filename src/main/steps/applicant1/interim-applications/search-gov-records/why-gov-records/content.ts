import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `What have you already done to try to find your ${partner}’s details?`,
  whatIsAlreadyDone: `Tell us about anything you’ve already done to try to find your ${partner}’s contact details, and the results of these actions.`,
  errors: {
    applicant1SearchGovRecordsReason: {
      required: 'You must provide a statement before continuing.',
    },
  },
});

// @TODO translations should be verified
const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `What have you already done to try to find your ${partner}’s details?`,
  whatIsAlreadyDone: `Tell us about anything you’ve already done to try to find your ${partner}’s contact details, and the results of these actions.`,
  errors: {
    applicant1SearchGovRecordsReason: {
      required: 'You must provide a statement before continuing.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1SearchGovRecordsReason: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.whatIsAlreadyDone,
      labelSize: 'normal',
      validator: isFieldFilledIn,
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
    form,
    ...translations,
  };
};
