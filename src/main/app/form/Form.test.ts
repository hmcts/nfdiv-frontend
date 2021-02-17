import { Form, FormContent } from './Form';
import { covertToDateObject } from './parser';
import { isFieldFilledIn } from './validation';

describe('Form', () => {
  const mockForm: FormContent = {
    fields: {
      field: {
        type: 'radios',
        values: [
          { label: l => l.no, value: 'No' },
          { label: l => l.yes, value: 'Yes' },
        ],
        validator: value => isFieldFilledIn(value),
      },
      dateField: {
        type: 'date',
        values: [
          { label: l => l.dateFormat['day'], name: 'day' },
          { label: l => l.dateFormat['month'], name: 'month' },
          { label: l => l.dateFormat['year'], name: 'year' },
        ],
        parser: value => covertToDateObject('dateField', value),
        validator: value => isFieldFilledIn(value),
      },
    },
    submit: {
      text: l => l.continue,
    },
  };

  const form = new Form(mockForm);

  test('Should validate a form', async () => {
    const errors = form.getErrors({
      field: 'Yes',
      dateField: {
        day: '1',
        month: '1',
        year: '2000',
      },
    });

    expect(errors).toStrictEqual([]);
  });

  test('Should validate a form and return error', async () => {
    const errors = form.getErrors({});

    expect(errors).toStrictEqual([
      {
        propertyName: 'field',
        errorType: 'required',
      },
      {
        propertyName: 'dateField',
        errorType: 'required',
      },
    ]);
  });

  describe('subfield validation', () => {
    const mockSubFieldForm: FormContent = {
      fields: {
        field: {
          type: 'radios',
          values: [
            {
              label: l => l.no,
              value: 'No',
              subFields: {
                testSubField: {
                  type: 'text',
                  label: 'Subfield',
                  validator: isFieldFilledIn,
                },
              },
            },
            { label: l => l.yes, value: 'Yes' },
          ],
          validator: isFieldFilledIn,
        },
      },
      submit: {
        text: l => l.continue,
      },
    };

    const subFieldForm = new Form(mockSubFieldForm);

    it('returns the field error', () => {
      const errors = subFieldForm.getErrors({});

      expect(errors).toStrictEqual([
        {
          propertyName: 'field',
          errorType: 'required',
        },
      ]);
    });

    it('does not return any subfields error if the field has not been selected', () => {
      const errors = subFieldForm.getErrors({ field: 'Yes' });

      expect(errors).toStrictEqual([]);
    });

    it('returns the subfield error when the field has been selected', () => {
      const errors = subFieldForm.getErrors({ field: 'No' });

      expect(errors).toStrictEqual([
        {
          errorType: 'required',
          propertyName: 'testSubField',
        },
      ]);
    });
  });

  test('Should parse a form body', async () => {
    const body = {
      field: 'Yes',
      'dateField-day': '1',
      'dateField-month': '1',
      'dateField-year': '2000',
    };
    form.getParsedBody(body);

    expect(body).toStrictEqual({
      field: 'Yes',
      dateField: {
        day: '1',
        month: '1',
        year: '2000',
      },
    });
  });
});
