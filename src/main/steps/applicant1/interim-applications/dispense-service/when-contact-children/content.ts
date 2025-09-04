import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `When and how does your ${partner} have contact with them?`,
  errors: {
    applicant1DispenseHowPartnerContactChildren: {
      required: `Enter details about any contact your ${partner} has had with the children`,
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `When and how does your ${partner} have contact with them?`,
  errors: {
    applicant1DispenseHowPartnerContactChildren: {
      required: `Enter details about any contact your ${partner} has had with the children`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseHowPartnerContactChildren: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.title,
      labelHidden: true,
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
