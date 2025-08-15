import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Are you able to upload a recent photo of your ${partner}?`,
  errors: {
    applicant1InterimAppsCanUploadEvidence: {
      required: 'You must select an option.',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Ydych chi’n gallu uwchlwytho llun diweddar o’ch ${partner}?`,
  errors: {
    applicant1InterimAppsCanUploadEvidence: {
      required: 'You must select an option.',
    },
  },
});

export const form: FormContent = {
  fields: () => ({
    applicant1InterimAppsCanUploadEvidence: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          id: 'yes',
        },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          id: 'no',
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
  }),
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
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.language) },
  };
};
