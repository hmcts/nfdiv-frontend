import { TranslationFn } from '../../../../../app/controller/GetController.js';
import { FormContent } from '../../../../../app/form/Form.js';
import { isFieldFilledIn } from '../../../../../app/form/validation.js';
import { CommonContent } from '../../../../common/common.content.js';

const en = ({ partner }: CommonContent) => ({
  title: `To the best of your knowledge, when did your ${partner} last have contact with them?`,
  errors: {
    applicant1DispensePartnerLastContactChildren: {
      required: `Enter details about when your ${partner} last had contact with the children`,
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Hyd eithaf eich gwybodaeth, pryd wnaeth eich ${partner} gael cysylltiad gyda nhw ddiwethaf?`,
  errors: {
    applicant1DispensePartnerLastContactChildren: {
      required: `Eglurwch pryd wnaeth eich ${partner} gael cysylltiad gyda’r plant ddiwethaf`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispensePartnerLastContactChildren: {
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
