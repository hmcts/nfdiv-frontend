import { capitalize } from 'lodash';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => {
  const invalid = 'You have entered an invalid character, like a number. Enter their name using letters only.';
  return {
    title: `Enter your ${partner}’s name`,
    partnerNameHint: `Include your ${partner}’s middle names, if they have any`,
    errors: {
      applicant1SearchGovRecordsPartnerName: {
        required: `${capitalize(partner)}'s name cannot be blank`,
        invalid,
      },
    },
  };
};

// @TODO translations should be verified
const cy: typeof en = ({ partner }: CommonContent) => {
  const invalid = 'You have entered an invalid character, like a number. Enter their name using letters only.';
  return {
    title: `Enter your ${partner}’s name`,
    partnerNameHint: `Include your ${partner}’s middle names, if they have any`,
    errors: {
      applicant1SearchGovRecordsPartnerName: {
        required: `${capitalize(partner)}'s name cannot be blank`,
        invalid,
      },
    },
  };
};

export const form: FormContent = {
  fields: userCase => ({
    applicant1SearchGovRecordsPartnerName: {
      type: 'text',
      classes: 'govuk-input',
      value: userCase.applicant2FullNameOnCertificate,
      hint: l => l.partnerNameHint,
      label: l => l.title,
      labelHidden: true,
      validator: input => isFieldFilledIn(input) || isFieldLetters(input),
    },
  }),
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
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    ...translations,
  };
};
