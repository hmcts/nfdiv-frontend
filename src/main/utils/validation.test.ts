import { isFieldFilledIn } from './validation';

describe('Validation', () => {
  test('Should check if value exist', async () => {
    const isValid = isFieldFilledIn('Yes');

    expect(isValid).toStrictEqual(undefined);
  });

  test('Should check if value does exist', async () => {
    let value;
    const isValid = isFieldFilledIn(value);

    expect(isValid).toStrictEqual('required');
  });
});
