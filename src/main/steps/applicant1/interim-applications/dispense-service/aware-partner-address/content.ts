import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Are you aware of where your ${partner} lived after parting?`,
  errors: {
    applicant1DispenseAwarePartnerLived: {
      required: `Select yes if you know where your ${partner} lived after parting.`,
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: `Are you aware of where your ${partner} lived after parting?`,
  errors: {
    applicant1DispenseAwarePartnerLived: {
      required: `Select yes if you know where your ${partner} lived after parting.`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseAwarePartnerLived: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.title,
      labelHidden: true,
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
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
