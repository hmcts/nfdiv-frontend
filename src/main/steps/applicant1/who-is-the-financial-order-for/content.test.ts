import { FinancialOrderFor } from '../../../app/case/definition.js';
import { Form, FormFieldsFn } from '../../../app/form/Form.js';

import { form as formContent } from './content.js';

describe('FormContent', () => {
  let form: Form;

  beforeEach(() => {
    form = new Form((formContent.fields as FormFieldsFn)({}));
  });

  it('parses "applicant" input value to FinancialOrderFor array', () => {
    const requestBody = { applicant1WhoIsFinancialOrderFor: 'applicant' };

    expect(form.getParsedBody(requestBody)).toStrictEqual({
      applicant1WhoIsFinancialOrderFor: [FinancialOrderFor.APPLICANT],
    });
  });

  it('parses "applicantAndChildren" input value to FinancialOrderFor array', () => {
    const requestBody = { applicant1WhoIsFinancialOrderFor: 'applicantAndChildren' };

    expect(form.getParsedBody(requestBody)).toStrictEqual({
      applicant1WhoIsFinancialOrderFor: [FinancialOrderFor.APPLICANT, FinancialOrderFor.CHILDREN],
    });
  });

  it('does not parse invalid input values to FinancialOrderFor array', () => {
    const requestBody = { applicant1WhoIsFinancialOrderFor: undefined };

    expect(form.getParsedBody(requestBody)).toStrictEqual({
      applicant1WhoIsFinancialOrderFor: undefined,
    });
  });
});
