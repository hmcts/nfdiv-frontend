import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `What is your ${partner}'s last known address?`,
  partnerAddressHint: `If you’re able to provide your ${partner}’s last known address it may help with the search`,
  partnerDateAtAddresses: 'Enter the dates they lived there',
  errors: {
    applicant1SearchGovRecordsApplicant2LastKnownAddress: {
      required: `You have not entered your ${partner}'s last known address. Enter it before continuing.`,
    },
    applicant1SearchGovRecordsApplicant2LastKnownAddressDates: {
      required: `You have not entered your ${partner}'s dates at the address. Enter it before continuing.`,
    },
  },
});

// @TODO translations should be verified
const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `What is your ${partner}'s last known address?`,
  partnerAddressHint: `If you’re able to provide your ${partner}’s last known address it may help with the search`,
  partnerDateAtAddresses: 'Enter the dates they lived there',
  errors: {
    applicant1SearchGovRecordsApplicant2LastKnownAddress: {
      required: `You have not entered your ${partner}'s last known address. Enter it before continuing.`,
    },
    applicant1SearchGovRecordsApplicant2LastKnownAddressDates: {
      required: `You have not entered your ${partner}'s dates at the address. Enter it before continuing.`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1SearchGovRecordsApplicant2LastKnownAddress: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.null,
      hint: l => l.partnerAddressHint,
      validator: isFieldFilledIn,
    },
    applicant1SearchGovRecordsApplicant2LastKnownAddressDates: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.partnerDateAtAddresses,
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
