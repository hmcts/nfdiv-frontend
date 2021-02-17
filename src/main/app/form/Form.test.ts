import { Form, FormContent } from './Form';
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
    },
    submit: {
      text: l => l.continue,
    },
  };

  const form = new Form(mockForm);

  test('Should validate a form', async () => {
    const errors = form.getErrors({
      field: 'Yes',
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
});
