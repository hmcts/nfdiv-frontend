import { Form } from './Form';

describe('Form', () => {
  const form = new Form();

  test('Should validate a form', async () => {
    const errors = form.getErrors({});

    expect(errors).toStrictEqual([]);
  });

});
