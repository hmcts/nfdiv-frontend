import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { generateContent as hwfReferenceNumberGenerateContent } from '../../common/hwf-reference-number/content';

export const form: FormContent = {
  fields: {
    applicant1DeemedHaveHwfReference: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
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
  const hwfReferenceNumberContent = hwfReferenceNumberGenerateContent(content);
  return {
    ...hwfReferenceNumberContent,
    form,
  };
};
