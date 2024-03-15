import { FinancialOrderFor } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/who-is-the-financial-order-for/content';

const labels = applicant1Content => {
  return {
    errors: {
      applicant2WhoIsFinancialOrderFor: {
        ...applicant1Content.errors.applicant1WhoIsFinancialOrderFor,
      },
    },
  };
};

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2WhoIsFinancialOrderFor: {
      type: 'checkboxes',
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'applicant2WhoIsFinancialOrderFor',
          label: l => l.me,
          value: FinancialOrderFor.APPLICANT,
        },
        {
          name: 'applicant2WhoIsFinancialOrderFor',
          label: l => l.children,
          value: FinancialOrderFor.CHILDREN,
        },
      ],
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
