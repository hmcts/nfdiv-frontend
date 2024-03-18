import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import {
  RadioButtons,
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
  fields: userCase => {
    const previouslySelectedValue = userCase.applicant2WhoIsFinancialOrderFor;

    return {
      applicant2WhoIsFinancialOrderFor: {
        type: 'radios',
        classes: 'govuk-radios',
        values: RadioButtons.getLabelledInputs(previouslySelectedValue),
        parser: value =>
          RadioButtons.getParsedValue(value as Record<string, string>, 'applicant2WhoIsFinancialOrderFor'),
        validator: value => isFieldFilledIn(value),
      },
    };
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
