import { CaseDate } from '../case/case';

import {
  areDateFieldsFilledIn,
  atLeastOneFieldIsChecked,
  hasValueChanged,
  isApplicant2EmailValid,
  isDateInputInvalid,
  isEmailValid,
  isFieldFilledIn,
  isFieldLetters,
  isFutureDate,
  isInvalidHelpWithFeesRef,
  isInvalidPostcode,
  isLessThanAYearAgoInc,
  isPhoneNoValid,
  isValidAccessCode,
  isValidCaseReference,
  isValidNumber,
} from './validation';

describe('Validation', () => {
  describe('isFieldFilledIn()', () => {
    test('Should check if value exist', async () => {
      const isValid = isFieldFilledIn('Yes');

      expect(isValid).toStrictEqual(undefined);
    });

    test('Should check if value does not exist', async () => {
      let value;
      const isValid = isFieldFilledIn(value);

      expect(isValid).toStrictEqual('required');
    });

    test('Should check if value is only whitespaces', async () => {
      const isValid = isFieldFilledIn('    ');

      expect(isValid).toStrictEqual('required');
    });
  });

  describe('areFieldsFilledIn()', () => {
    test('Should check if values in object exist', async () => {
      const isValid = areDateFieldsFilledIn({ day: '1', month: '1', year: '1' });

      expect(isValid).toStrictEqual(undefined);
    });

    test('Should check if values in object does not exist', async () => {
      const isValid = areDateFieldsFilledIn({ day: '', month: '', year: '' });

      expect(isValid).toStrictEqual('required');
    });
  });

  describe('hasValueChanged()', () => {
    test('Should handle null values', async () => {
      const hasChanged = hasValueChanged(1, null);
      expect(hasChanged).toStrictEqual(undefined);
    });

    test('Should check if primitive value has changed', async () => {
      const hasChanged = hasValueChanged(1, 2);
      expect(hasChanged).toStrictEqual(undefined);
    });

    test('Should check if primitive value has not changed', async () => {
      const hasChanged = hasValueChanged(1, 1);
      expect(hasChanged).toBeTruthy();
    });

    test('Should check if arrays have changed', async () => {
      const hasChanged = hasValueChanged([1, 2, 3], [1, 4, 3]);
      expect(hasChanged).toStrictEqual(undefined);
    });

    test('Should check if arrays have not changed', async () => {
      const hasChanged = hasValueChanged([1, 2, 3], [1, 2, 3]);
      expect(hasChanged).toBeTruthy();
    });

    test('Should handle blank arrays', async () => {
      const hasChanged = hasValueChanged([1, undefined, null], []);
      expect(hasChanged).toStrictEqual(undefined);
    });
  });

  describe('isFutureDate()', () => {
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

      expect(isValid).toStrictEqual('invalidDateInFuture');
    });
  });

  describe('isMoreThanAYearAgo()', () => {
    test('Should check if date entered is less than a year ago', async () => {
      const dateObj = new Date();
      const date = {
        day: dateObj.getUTCDate().toString(),
        month: (dateObj.getUTCMonth() - 6).toString(),
        year: dateObj.getUTCFullYear().toString(),
      };
      const isValid = isLessThanAYearAgoInc(date);
      expect(isValid).toStrictEqual('lessThanAYearAgoInc');
    });

    test('Should check if date entered is exactly a year ago', async () => {
      const dateObj = new Date();
      const date = {
        day: dateObj.getUTCDate().toString(),
        month: (dateObj.getUTCMonth() - 11).toString(),
        year: dateObj.getUTCFullYear().toString(),
      };
      const isValid = isLessThanAYearAgoInc(date);

      expect(isValid).toStrictEqual('lessThanAYearAgoInc');
    });

    test('Should check if date entered is more than a year ago', async () => {
      const dateObj = new Date();
      const date = {
        day: (dateObj.getUTCDate() - 1).toString(),
        month: (dateObj.getUTCMonth() - 11).toString(),
        year: dateObj.getUTCFullYear().toString(),
      };
      const isValid = isLessThanAYearAgoInc(date);

      expect(isValid).toStrictEqual(undefined);
    });
  });

  describe('isDateInputInvalid()', () => {
    test.each([
      { date: { day: 1, month: 1, year: 1970 }, expected: undefined },
      { date: { day: 31, month: 12, year: 2000 }, expected: undefined },
      { date: { day: 31, month: 12, year: 123 }, expected: 'invalidYear' },
      { date: { day: 31, month: 12, year: 1800 }, expected: 'invalidDateTooFarInPast' },
      { date: { day: 1, month: 1, year: 1 }, expected: 'invalidYear' },
      { date: { day: -31, month: 12, year: 2000 }, expected: 'invalidDate' },
      { date: { day: 31, month: -12, year: 2000 }, expected: 'invalidDate' },
      { date: { day: 32, month: 12, year: 2000 }, expected: 'invalidDate' },
      { date: { day: 31, month: 13, year: 2000 }, expected: 'invalidDate' },
      { date: { day: 'no', month: '!%', year: 'way' }, expected: 'invalidDate' },
      { date: { day: '29', month: '2', year: '2000' }, expected: undefined },
      { date: { day: '31', month: '2', year: '2000' }, expected: 'invalidDate' },
    ])('checks dates validity when %o', ({ date, expected }) => {
      const isValid = isDateInputInvalid(date as unknown as CaseDate);

      expect(isValid).toStrictEqual(expected);
    });
  });

  describe('isInvalidHelpWithFeesRef()', () => {
    it.each([
      { mockRef: '', expected: 'required' },
      { mockRef: '1', expected: 'invalid' },
      { mockRef: '12345', expected: 'invalid' },
      { mockRef: '1234567', expected: 'invalid' },
      { mockRef: '12345!', expected: 'invalid' },
      { mockRef: 'HWFA1B23C', expected: 'invalid' },
      { mockRef: 'A1B23C', expected: 'invalid' },
      { mockRef: 'A1B-23C', expected: 'invalid' },
      { mockRef: 'HWF-A1B-23C', expected: 'invalidUsedExample' },
      { mockRef: 'HWF-AAA-BBB', expected: undefined },
      { mockRef: 'HWF-A1A-B2B', expected: undefined },
      { mockRef: 'HWF-123-456', expected: undefined },
      { mockRef: 'AAA-BBB', expected: 'invalid' },
      { mockRef: 'AAABBB', expected: 'invalid' },
      { mockRef: '123456', expected: 'invalid' },
    ])('validates the help with fees ref when %o', ({ mockRef, expected }) => {
      expect(isInvalidHelpWithFeesRef(mockRef)).toEqual(expected);
    });
  });

  describe('isInvalidPostcode()', () => {
    it.each([
      { mockRef: '', expected: 'required' },
      { mockRef: '1', expected: 'invalid' },
      { mockRef: '12345', expected: 'invalid' },
      { mockRef: '@£$£@$%', expected: 'invalid' },
      { mockRef: 'not a postcode', expected: 'invalid' },
      { mockRef: 'SW1A 1AA', expected: undefined },
      { mockRef: 'SW1A1AA', expected: undefined },
      { mockRef: 'sw1a1aa', expected: undefined },
      { mockRef: 'sw1a 1aa', expected: undefined },
      { mockRef: 'SW1A!1AA', expected: 'invalid' },
    ])('validates the help with fees ref when %o', ({ mockRef, expected }) => {
      expect(isInvalidPostcode(mockRef)).toEqual(expected);
    });
  });

  describe('isPhoneNoValid()', () => {
    it.each([
      { mockTel: '', expected: undefined },
      { mockTel: '1', expected: 'invalid' },
      { mockTel: '12345', expected: 'invalid' },
      { mockTel: '1234567', expected: 'invalid' },
      { mockTel: '12345!', expected: 'invalid' },
      { mockTel: 'A1B23C', expected: 'invalid' },
      { mockTel: '123456', expected: 'invalid' },
      { mockTel: '0123456789', expected: undefined },
      { mockTel: '01234567890', expected: undefined },
      { mockTel: '+1 (0)12345678901', expected: undefined },
      { mockTel: '+1 (0)12345678901$', expected: 'invalid' },
    ])('validates a phone number when %o', ({ mockTel, expected }) => {
      expect(isPhoneNoValid(mockTel)).toEqual(expected);
    });
  });

  describe('isEmailValid()', () => {
    it.each([
      { mockEmail: '', expected: 'invalid' },
      { mockEmail: 'test', expected: 'invalid' },
      { mockEmail: '12345', expected: 'invalid' },
      { mockEmail: 'test@test.com', expected: undefined },
      { mockEmail: 'test_123@test.com', expected: undefined },
      { mockEmail: 'test_123@test@test.com', expected: 'invalid' },
    ])('validates an email when %o', ({ mockEmail, expected }) => {
      expect(isEmailValid(mockEmail)).toEqual(expected);
    });
  });

  describe('isApplicant2EmailValid()', () => {
    it.each([
      { mockEmail: '', expected: 'invalid' },
      { mockEmail: 'test', expected: 'invalid' },
      { mockEmail: '12345', expected: 'invalid' },
      { mockEmail: 'test@test.com', expected: undefined },
      { mockEmail: 'test_123@test.com', expected: undefined },
      { mockEmail: 'test_123@test@test.com', expected: 'invalid' },
      { mockEmail: 'applicant1@email.com', expected: 'sameEmail' },
    ])('validates an email when %o', ({ mockEmail, expected }) => {
      expect(isApplicant2EmailValid(mockEmail, 'applicant1@email.com')).toEqual(expected);
    });
  });

  describe('isFieldLetters()', () => {
    test.each([
      { input: 'Firstname Lastname', expected: undefined },
      { input: 'Firstname Middle-Double-barrelled Lastname', expected: undefined },
      { input: "O'Firstname O’Lastname", expected: undefined },
      { input: 'Firştnåmé Midğlø Lâßtnámê', expected: undefined },
      { input: '1stname Lastname', expected: 'invalid' },
      { input: 'Firstname! La$tname', expected: 'invalid' },
      { input: 'имя Фамилия', expected: 'invalid' },
      { input: 'όνομα επίθετο', expected: 'invalid' },
      { input: '名姓', expected: 'invalid' },
      { input: '名前苗字', expected: 'invalid' },
      { input: '이름 성', expected: 'invalid' },
      { input: 'họ và tên', expected: undefined },
      { input: '💔', expected: 'invalid' },
    ])('validates only latin based letters, spaces, hyphens %s', ({ input, expected }) => {
      const isValid = isFieldLetters(input);

      expect(isValid).toStrictEqual(expected);
    });
  });

  describe('atLeastOneFieldIsChecked()', () => {
    test('Should check if value exist', async () => {
      const isValid = atLeastOneFieldIsChecked(['Yes']);

      expect(isValid).toStrictEqual(undefined);
    });

    test('Should check if value does not exist', async () => {
      const isValid = atLeastOneFieldIsChecked([]);

      expect(isValid).toStrictEqual('required');
    });
  });

  describe('isValidCaseReference()', () => {
    test('Should check if case reference is valid with hyphens', async () => {
      const isValid = isValidCaseReference('1234-1234-1234-1234');
      expect(isValid).toStrictEqual(undefined);
    });

    test('Should check if case reference is valid without hyphens', async () => {
      const isValid = isValidCaseReference('1234123412341234');
      expect(isValid).toStrictEqual(undefined);
    });

    test('Should reject invalid case reference', async () => {
      const isValid = isValidCaseReference('123412341234');
      expect(isValid).toStrictEqual('invalid');
    });

    test('Should reject empty case reference', async () => {
      const isValid = isValidCaseReference('');
      expect(isValid).toStrictEqual('invalid');
    });
  });

  describe('isValidAccessCode()', () => {
    test('Should accept valid access code', async () => {
      const isValid = isValidAccessCode('QWERTY45');
      expect(isValid).toStrictEqual(undefined);
    });

    test('Should accept valid access code with whitespaces', async () => {
      const isValid = isValidAccessCode('QW E RTY45 ');
      expect(isValid).toStrictEqual(undefined);
    });

    test('Should reject invalid access code', async () => {
      const isValid = isValidAccessCode('QWERTY');
      expect(isValid).toStrictEqual('invalid');
    });

    test('Should reject empty access code', async () => {
      const isValid = isValidAccessCode('');
      expect(isValid).toStrictEqual('invalid');
    });
  });

  describe('isValidNumber()', () => {
    const MIN_VALUE = 0;
    const MAX_VALUE = 100;

    test('Should reject letters', async () => {
      const isValid = isValidNumber('12345a', MIN_VALUE, MAX_VALUE);
      expect(isValid).toStrictEqual('invalid');
    });

    test('Should reject decimal places', async () => {
      const isValid = isValidNumber('123.00', MIN_VALUE, MAX_VALUE);
      expect(isValid).toStrictEqual('invalid');
    });

    test('Should reject numbers that are too small', async () => {
      const isValid = isValidNumber('-10', MIN_VALUE, MAX_VALUE);
      expect(isValid).toStrictEqual('invalid');
    });

    test('Should reject numbers that are too big', async () => {
      const isValid = isValidNumber('1000', MIN_VALUE, MAX_VALUE);
      expect(isValid).toStrictEqual('invalid');
    });

    test('Should accept numbers within the specified range', async () => {
      const isValid = isValidNumber('10', MIN_VALUE, MAX_VALUE);
      expect(isValid).toStrictEqual(undefined);
    });
  });
});
