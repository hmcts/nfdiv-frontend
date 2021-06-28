import { FinancialOrderFor, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../app/form/validation';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../do-you-want-to-apply-financial-order/content';

const labels = applicant1Content => {
  return {
    errors: {
      applicant2ApplyForFinancialOrder: {
        required: applicant1Content.errors.applyForFinancialOrder,
      },
      applicant2WhoIsFinancialOrderFor: {
        required: applicant1Content.errors.whoIsFinancialOrderFor,
      },
    },
  };
};

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2ApplyForFinancialOrder: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.title,
      hint: l => l.hint,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            applicant2WhoIsFinancialOrderFor: {
              type: 'checkboxes',
              label: l => l.subField,
              hint: l => l.subFieldHint,
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'applicant2WhoIsFinancialOrderFor',
                  label: l => l.me,
                  value: FinancialOrderFor.APPLICANT_1,
                },
                {
                  name: 'applicant2WhoIsFinancialOrderFor',
                  label: l => l.children,
                  value: FinancialOrderFor.CHILDREN,
                },
              ],
            },
          },
        },
        { label: l => l.no, value: YesOrNo.NO },
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
