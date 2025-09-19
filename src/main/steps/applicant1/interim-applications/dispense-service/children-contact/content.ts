import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Does your ${partner} have any contact with them?`,
  errors: {
    applicant1DispensePartnerContactWithChildren: {
      required: `Select yes if you know your ${partner} is in contact with the children of the family`,
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: `Does your ${partner} have any contact with them?`,
  errors: {
    applicant1DispensePartnerContactWithChildren: {
      required: `Select yes if you know your ${partner} is in contact with the children of the family`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispensePartnerContactWithChildren: {
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
