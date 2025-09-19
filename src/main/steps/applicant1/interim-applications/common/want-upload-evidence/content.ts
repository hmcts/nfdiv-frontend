import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => ({
  title: 'Are you able to upload evidence?',
  statement: '',
  errors: {
    applicant1InterimAppsCanUploadEvidence: {
      required: "Select 'Yes' if you have evidence to upload.",
    },
  },
});

// @TODO translations
const cy = () => ({
  title: 'A ydych yn gallu uwchlwytho tystiolaeth?',
  statement: '',
  errors: {
    applicant1InterimAppsCanUploadEvidence: {
      required: "Dewiswch 'Oes' os oes gennych dystiolaeth i’w huwchlwytho.",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1InterimAppsCanUploadEvidence: {
      type: 'radios',
      classes: 'govuk-radios',
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
