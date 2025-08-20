import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: Partial<CommonContent>) => ({
  title: "Enter the employer's details",
  employersName: 'Name of employer',
  employersAddress: "Employer's address",
  partnerOccupation: `Your ${partner}'s occupation`,
  employerResultsDescription: 'Results of your enquiry with the employer',
  errors: {
    applicant1DispenseEmployerName: {
      required: 'Enter the employer’s name or the company name',
    },
    applicant1DispenseEmployerAddress: {
      required: 'Enter the employer’s address or the company address',
    },
    applicant1DispensePartnerOccupation: {
      required: `Enter your ${partner}'s occupation`,
    },
    applicant1DispenseContactingEmployerResults: {
      required: 'Enter details about the results of your enquiries with the employer',
    },
  },
});

const cy = ({ partner }: CommonContent) => ({
  title: "Enter the employer's details",
  employersName: 'Name of employer',
  employersAddress: "Employer's address",
  partnerOccupation: `Your ${partner}'s occupation`,
  employerResultsDescription: 'Results of your enquiry with the employer',
  errors: {
    applicant1DispenseEmployerName: {
      required: 'Enter the employer’s name or the company name',
    },
    applicant1DispenseEmployerAddress: {
      required: 'Enter the employer’s address or the company address',
    },
    applicant1DispensePartnerOccupation: {
      required: `Enter your ${partner}'s occupation`,
    },
    applicant1DispenseContactingEmployerResults: {
      required: 'Enter details about the results of your enquiries with the employer',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1DispenseEmployerName: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.employersName,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant1DispenseEmployerAddress: {
      type: 'textarea',
      classes: 'govuk-label',
      label: l => l.employersAddress,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant1DispensePartnerOccupation: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.partnerOccupation,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant1DispenseContactingEmployerResults: {
      type: 'textarea',
      classes: 'govuk-label',
      label: l => l.employerResultsDescription,
      labelSize: null,
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
    ...translations,
    form,
  };
};
