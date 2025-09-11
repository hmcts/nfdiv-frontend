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
    applicant1SearchGovRecordsPartnerAdditionalAddress1: {
      required: `Enter the details of any other known address of your ${partner} before continuing`,
    },
    applicant1SearchGovRecordsPartnerAdditionalAddressDates1: {
      required: `Enter the dates your ${partner} lived at the address before continuing.`,
    },
    applicant1SearchGovRecordsPartnerAdditionalAddressDates2: {
      required: `Enter details of any other known address of your ${partner} before continuing.`,
    },
    applicant1SearchGovRecordsPartnerAdditionalAddress2: {
      required: `Enter the dates your ${partner} lived at the address before continuing.`,
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
      required: `Nodwch fanylion unrhyw gyfeiriad hysbys arall eich ${partner} cyn parhau.`,
    },
    applicant1SearchGovRecordsPartnerAdditionalAddressDates1: {
      required: `Nodwch y dyddiadau y bu eich ${partner} yn byw yn y cyfeiriad cyn parhau.`,
    },
    applicant1SearchGovRecordsPartnerAdditionalAddressDates2: {
      required: `Nodwch fanylion unrhyw gyfeiriad hysbys arall eich ${partner} cyn parhau.`,
    },
    applicant1SearchGovRecordsPartnerAdditionalAddress2: {
      required: `Nodwch y dyddiadau y bu eich ${partner} yn byw yn y cyfeiriad cyn parhau.`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1SearchGovRecordsPartnerAdditionalAddress1: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.address + ' 1',
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
      label: l => l.address + ' 2 (optional)',
      labelSize: 'normal',
      validator: (
        value: string | string[] | CaseDate | Partial<Case> | undefined,
        formData: Partial<Case>
      ): string | undefined => {
        if (formData['applicant1SearchGovRecordsPartnerAdditionalAddressDates2']?.length && !value) {
          return 'required';
        }
      },
    },
    applicant1SearchGovRecordsPartnerAdditionalAddressDates2: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.dateLivedOnAddress + ' (optional)',
      labelSize: 'normal',
      validator: (
        value: string | string[] | CaseDate | Partial<Case> | undefined,
        formData: Partial<Case>
      ): string | undefined => {
        if (formData['applicant1SearchGovRecordsPartnerAdditionalAddress2']?.length && !value) {
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
