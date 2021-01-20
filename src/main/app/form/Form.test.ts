import { Form, FormContent } from './Form';
import { isFieldFilledIn } from './validation';

describe('Form', () => {
  const mockForm: FormContent = {
    fields: {
      field: {
        type: 'radios',
        values: [
          {label: l => l.no, value: 'No'},
          {label: l => l.yes, value: 'Yes'}
        ],
        validator: value => isFieldFilledIn(value)
      }
    },
    submit: {
      text: l => l.continue
    }
  };

  const form = new Form(mockForm);

  test('Should validate a form', async () => {
    const errors = form.getErrors({
      field: 'Yes'
    });

    expect(errors).toStrictEqual([]);
  });

  test('Should validate a form and return error', async () => {
    const errors = form.getErrors({});

    expect(errors).toStrictEqual([
      {
        propertyName: 'field',
        errorType: 'required'
      }
    ]);
  });

});
