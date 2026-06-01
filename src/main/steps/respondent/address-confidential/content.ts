import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import type { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant1GenerateContent } from '../../applicant1/address-private/content';
import { InputLabelsByLanguage } from '../../common/input-labels.content';

const labels = content => ({
  errors: {
    applicant2AddressPrivate: content.errors.applicant1AddressPrivate,
  },
  title: content.title, // Reuse the title from applicant1
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
        { label: l => l[YesOrNo.YES], value: YesOrNo.YES },
        { label: l => l[YesOrNo.NO], value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const radioButtonAnswersPrivate: InputLabelsByLanguage<YesOrNo> = {
  en: {
    [YesOrNo.YES]: 'Keep my contact details private',
    [YesOrNo.NO]: 'I do not need my contact details kept private',
  },
  cy: {
    [YesOrNo.YES]: 'Cadwch fy manylion cyswllt yn breifat',
    [YesOrNo.NO]: 'Nid oes arnaf angen cadw fy manylion cyswllt yn breifat',
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
