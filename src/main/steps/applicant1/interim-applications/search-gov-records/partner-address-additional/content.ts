import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Enter any other addresses related to your ${partner}`,
  address: 'Address',
  dateLivedOnAddress: 'Enter the dates they lived there',
  errors: {
    applicant1SearchGovRecordsPartnerAdditionalAddress1: {
      required: `You have not entered your ${partner}'s additional address. Enter it before continuing.`,
    },
    applicant1SearchGovRecordsPartnerAdditionalAddressDates1: {
      required: `You have not entered your ${partner}'s dates at the address. Enter it before continuing.`,
    },
  },
});

// @TODO translations should be verified
const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Rhowch unrhyw gyfeiriadau eraill sy'n gysylltiedig â'ch ${partner}`,
  address: 'Cyfeiriad',
  dateLivedOnAddress: "Rhowch y dyddiadau roedden nhw'n byw yno",
  errors: {
    applicant1SearchGovRecordsPartnerAdditionalAddress1: {
      required: `You have not entered your ${partner}'s additional address. Enter it before continuing.`,
    },
    applicant1SearchGovRecordsPartnerAdditionalAddressDates1: {
      required: `Enter the dates your ${partner} lived at this address`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1SearchGovRecordsPartnerAdditionalAddress1: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.address + '1',
      labelSize: 'normal',
      validator: isFieldFilledIn,
    },
    applicant1SearchGovRecordsPartnerAdditionalAddressDates1: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.dateLivedOnAddress,
      labelSize: 'normal',
      validator: isFieldFilledIn,
    },
    applicant1SearchGovRecordsPartnerAdditionalAddress2: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.address + '2 (optional)',
      labelSize: 'normal',
    },
    applicant1SearchGovRecordsPartnerAdditionalAddressDates2: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.dateLivedOnAddress + ' (optional)',
      labelSize: 'normal',
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
