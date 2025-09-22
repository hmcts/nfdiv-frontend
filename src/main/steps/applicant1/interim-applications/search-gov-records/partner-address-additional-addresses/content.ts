import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Do you know of any other addresses related to your ${partner}?`,
  partnerAdditionalAddressesHint: "If you're able to provide any other addresses it may help with the search",
  errors: {
    applicant1SearchGovRecordsKnowPartnerAdditionalAddresses: {
      required: 'Select yes if you know any other addresses',
    },
  },
});

// @TODO translations should be verified
const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Ydych chi'n gwybod am unrhyw gyfeiriadau eraill sy'n gysylltiedig â'ch ${partner}?`,
  partnerAdditionalAddressesHint:
    "Os ydych chi'n gallu darparu unrhyw gyfeiriadau eraill, efallai y bydd yn helpu gyda'r chwiliad",
  errors: {
    applicant1SearchGovRecordsKnowPartnerAdditionalAddresses: {
      required: 'Dewiswch “Ydw” os ydych yn gwybod am unrhyw gyfeiriadau eraill',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1SearchGovRecordsKnowPartnerAdditionalAddresses: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.null,
      labelHidden: false,
      hint: l => l.partnerAdditionalAddressesHint,
      values: [
        {
          label: l => (l.language === 'cy' ? 'Ydw' : l.yes),
          id: 'yes',
          value: YesOrNo.YES,
        },
        {
          label: l => (l.language === 'cy' ? 'Nac ydw' : l.no),
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
