import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isInvalidHelpWithFeesRef } from '../../../../../app/form/validation';
import { generateContent as hwfReferenceNumberInputGenerateContent } from '../../common/hwf-reference-number-input/content';

export const form: FormContent = {
  fields: {
    applicant1DeemedHwfRefNumber: {
      type: 'text',
      attributes: {
        maxLength: 11,
      },
      classes: 'govuk-!-width-one-third',
      label: '',
      labelHidden: true,
      hint: l => l.refExample,
      validator: isInvalidHelpWithFeesRef,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const hwfReferenceNumberInputContent = hwfReferenceNumberInputGenerateContent(content);
  return {
    ...hwfReferenceNumberInputContent,
    form,
  };
};
