import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner, required }: CommonContent) => ({
  title: `Do you know of any other addresses related to your ${partner}?`,
  partnerAdditionalAddressesHint: `If you’re able to provide your ${partner}’s National Insurance number it will help with the search.`,
  errors: {
    applicant1SearchGovRecordsKnowApplicant2AdditionalAddresses: {
      required,
    },
  },
});

// @TODO translations should be verified
const cy: typeof en = ({ partner, required }: CommonContent) => ({
  title: `Do you know of any other addresses related to your ${partner}?`,
  partnerAdditionalAddressesHint: `If you’re able to provide your ${partner}’s National Insurance number it will help with the search.`,
  errors: {
    applicant1SearchGovRecordsKnowApplicant2AdditionalAddresses: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1SearchGovRecordsKnowApplicant2AdditionalAddresses: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.null,
      labelHidden: false,
      hint: l => l.partnerAdditionalAddressesHint,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          id: 'no',
          value: YesOrNo.NO,
        },
      ],
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
