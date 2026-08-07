import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import type { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant1GenerateContent } from '../../applicant1/address-private/content';

const labels = content => ({
  errors: {
    applicant2AddressPrivate: content.errors.applicant1AddressPrivate,
  },
  title: content.title, // Reuse the title from applicant1
  detailsPrivate: content.detailsPrivate, // Reuse the "details private" wording
  detailsNotPrivate: content.detailsNotPrivate,
});

export const form: FormContent = {
  fields: {
    applicant2AddressPrivate: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.detailsPrivate,
          value: YesOrNo.YES,
        },
        {
          label: l => l.detailsNotPrivate,
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
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(applicant1Content),
    form,
  };
};
