import { Form } from './Form';
import { ValidateFunction } from 'ajv';

describe('Form', () => {
  const mockValidator: ValidateFunction = function (body: any) {
    // @ts-ignore
    this.errors = [];
  } as any;

  const form = new Form(mockValidator);

  test('Should validate a form', async () => {
    const errors = form.getErrors({});

    expect(errors).toStrictEqual([]);
  });

});
