import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => ({
  title: 'Are you able to upload evidence?',
  statement: '',
  errors: {
    applicant1InterimAppsCanUploadEvidence: {
      required: 'You must select an option before continuing.',
    },
  },
});

// @TODO translations
const cy = () => ({
  title: 'A ydych yn gallu uwchlwytho tystiolaeth?',
  statement: '',
  errors: {
    applicant1InterimAppsCanUploadEvidence: {
      required: 'Rhaid i chi ddewis opsiwn cyn parhau.',
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
