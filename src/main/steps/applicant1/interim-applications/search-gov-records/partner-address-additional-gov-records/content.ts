import { Case, CaseDate } from '../../../../../app/case/case';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Enter any other addresses related to your ${partner}`,
  address: 'Address',
  dateLivedOnAddress: 'Enter the dates they lived there',
  errors: {
    applicant1SearchGovRecordsApplicant2AdditionalAddress1: {
      required: `You have not entered your ${partner}'s additional address. Enter it before continuing.`,
    },
    applicant1SearchGovRecordsApplicant2AdditionalAddressDates1: {
      required: `You have not entered your ${partner}'s dates at the address. Enter it before continuing.`,
    },
    applicant1SearchGovRecordsApplicant2AdditionalAddress: {
      required: `You have not entered your ${partner}'s dates at the address 2. Enter it before continuing.`,
    },
  },
});

// @TODO translations should be verified
const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Enter any other addresses related to your ${partner}`,
  address: 'Address',
  dateLivedOnAddress: 'Enter the dates they lived there',
  errors: {
    applicant1SearchGovRecordsApplicant2AdditionalAddress1: {
      required: `You have not entered your ${partner}'s last known address. Enter it before continuing.`,
    },
    applicant1SearchGovRecordsApplicant2AdditionalAddressDates1: {
      required: `Enter the dates your ${partner} lived at this address`,
    },
    applicant1SearchGovRecordsApplicant2AdditionalAddress: {
      required: `You have entered address 2. Enter the dates your ${partner} lived at this address`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1SearchGovRecordsApplicant2AdditionalAddress1: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.address + '1',
      labelSize: 'normal',
      validator: isFieldFilledIn,
    },
    applicant1SearchGovRecordsApplicant2AdditionalAddressDates1: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.dateLivedOnAddress,
      labelSize: 'normal',
      validator: isFieldFilledIn,
    },
    applicant1SearchGovRecordsApplicant2AdditionalAddress2: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.address + '2 (optional)',
      labelSize: 'normal',
    },
    applicant1SearchGovRecordsApplicant2AdditionalAddressDates2: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.dateLivedOnAddress + ' (optional)',
      labelSize: 'normal',
      validator: (
        value: string | string[] | CaseDate | Partial<Case> | undefined,
        formData: Partial<Case>
      ): string | undefined => {
        if (!formData['applicant1SearchGovRecordsApplicant2AdditionalAddress2']?.length) {
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
    form,
    ...translations,
  };
};
