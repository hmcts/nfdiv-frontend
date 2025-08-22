import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isInvalidNationalInsuranceNumber } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Do you know your ${partner}'s National Insurance number?`,
  partnerNationalInsuranceHint: `If you’re able to provide your ${partner}’s National Insurance number it will help with the search.`,
  nationalInsuranceHint: 'For example, JB 34 66 84 D',
  enterNationalInsurance: `Enter your ${partner}'s National Insurance number`,
  errors: {
    applicant1SearchGovRecordsKnowPartnerNationalInsurance: {
      required: `Select yes if you know your ${partner}'s National Insurance number`,
    },
    applicant1SearchGovRecordsPartnerNationalInsurance: {
      required: `Enter your ${partner}'s National Insurance number`,
      invalidUsedExample: `You have entered the example National Insurance number. Enter the number you know of your ${partner}.`,
      invalidFormat: 'Enter a National Insurance number in the correct format',
    },
  },
});

// @TODO translations should be verified
const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Do you know your ${partner}'s National Insurance number?`,
  partnerNationalInsuranceHint: `If you’re able to provide your ${partner}’s National Insurance number it will help with the search.`,
  nationalInsuranceHint: 'For example, JB 34 66 84 D',
  enterNationalInsurance: `Enter your ${partner}'s National Insurance number`,
  errors: {
    applicant1SearchGovRecordsKnowPartnerNationalInsurance: {
      required: `Select yes if you know your ${partner}'s National Insurance number`,
    },
    applicant1SearchGovRecordsPartnerNationalInsurance: {
      required: `Enter your ${partner}'s National Insurance number`,
      invalidUsedExample: `You have entered the example National Insurance number. Enter the number you know of your ${partner}.`,
      invalidFormat: 'Enter a National Insurance number in the correct format',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1SearchGovRecordsKnowPartnerNationalInsurance: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.null,
      labelHidden: false,
      hint: l => l.partnerNationalInsuranceHint,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
          subFields: {
            applicant1SearchGovRecordsPartnerNationalInsurance: {
              type: 'text',
              classes: 'govuk-input',
              attributes: { maxLength: 13 },
              label: l => l.enterNationalInsurance,
              labelSize: 'normal',
              hint: l => l.nationalInsuranceHint,
              validator: isInvalidNationalInsuranceNumber,
            },
          },
        },
        {
          label: l => l.no,
          id: 'no',
          value: YesOrNo.NO,
        },
      ],
      validator: value => isFieldFilledIn(value),
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
