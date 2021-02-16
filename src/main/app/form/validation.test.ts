import { isDateInputNumeric, isDatesFilledIn, isFieldFilledIn, isFutureDate, isLessThanAYear } from './validation';

describe('Validation', () => {
  test('Should check if value exist', async () => {
    const isValid = isFieldFilledIn('Yes');

    expect(isValid).toStrictEqual(undefined);
  });

  test('Should check if value does not exist', async () => {
    let value;
    const isValid = isFieldFilledIn(value);

    expect(isValid).toStrictEqual('required');
  });

  test('Should check if values in object exist', async () => {
    const isValid = isDatesFilledIn({ day: '1', month: '1', year: '1' });

    expect(isValid).toStrictEqual(undefined);
  });

  test('Should check if values in object does not exist', async () => {
    const isValid = isDatesFilledIn({ day: '', month: '', year: '' });

    expect(isValid).toStrictEqual('required');
  });

  test('Should check if date entered is future date', async () => {
    const dateObj = new Date();
    const date = {
      day: dateObj.getUTCDate().toString(),
      month: dateObj.getUTCMonth().toString(),
      year: (dateObj.getUTCFullYear() - 1).toString(),
    };
    let isValid = isFutureDate(date);

    expect(isValid).toStrictEqual(undefined);

    date.year += '1';
    isValid = isFutureDate(date);

    expect(isValid).toStrictEqual('invalidDate');
  });

  test('Should check if date entered is less than a year', async () => {
    const dateObj = new Date();
    const date = {
      day: dateObj.getUTCDate().toString(),
      month: (dateObj.getUTCMonth() - 6).toString(),
      year: dateObj.getUTCFullYear().toString(),
    };
    let isValid = isLessThanAYear(date);

    expect(isValid).toStrictEqual('lessThanAYear');

    date.year = (+date.year - 1).toString();
    isValid = isLessThanAYear(date);

    expect(isValid).toStrictEqual(undefined);
  });

  test('Should check if values in object is numeric', async () => {
    const isValid = isDateInputNumeric({ day: '1', month: '1', year: '1' });

    expect(isValid).toStrictEqual(undefined);
  });

  test('Should check if values in object is not numeric', async () => {
    const isValid = isDateInputNumeric({ day: 'asd', month: '!', year: 'asfd' });

    expect(isValid).toStrictEqual('invalidInput');
  });
});
