import { YesOrNo } from '../../../app/case/definition.js';
import { TranslationFn } from '../../../app/controller/GetController.js';
import { FormContent } from '../../../app/form/Form.js';
import { isFieldFilledIn } from '../../../app/form/validation.js';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/dividing-money-property/content.js';

const labels = applicant1Content => {
  return {
    errors: {
      applicant2ApplyForFinancialOrder: {
        ...applicant1Content.errors.applicant1ApplyForFinancialOrder,
      },
    },
  };
};

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2ApplyForFinancialOrder: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doYouWantToApplyForFinancialOrder,
      labelHidden: false,
      hint: l => l.hint,
      values: [
        { label: l => l[YesOrNo.YES], value: YesOrNo.YES },
        {
          label: l => l[YesOrNo.NO],
          value: YesOrNo.NO,
          conditionalText: l => `<p class="govuk-label">${l.noSelectedWarning}</p>`,
        },
      ],
      validator: isFieldFilledIn,
    },
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
