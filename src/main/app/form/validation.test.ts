import { CaseDate, Checkbox } from '../case/case';

import {
  areFieldsFilledIn,
  doesNotKnowEmail,
  isDateInputInvalid,
  isEmailValid,
  isFieldFilledIn,
  isFieldLetters,
  isFutureDate,
  isInvalidHelpWithFeesRef,
  isInvalidPostcode,
  isLessThanAYear,
  isPhoneNoValid,
  isRespondentEmailFilledOrNotKnown,
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
      const isValid = areFieldsFilledIn({ day: '1', month: '1', year: '1' });

      expect(isValid).toStrictEqual(undefined);
    });

    test('Should check if values in object does not exist', async () => {
      const isValid = areFieldsFilledIn({ day: '', month: '', year: '' });

      expect(isValid).toStrictEqual('required');
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

  describe('isLessThanAYear()', () => {
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
    ])('checks dates validity when %o', ({ date, expected }) => {
      const isValid = isDateInputInvalid((date as unknown) as CaseDate);

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

  describe('isFieldLetters()', () => {
    test('Should check if value only letters', async () => {
      const isValid = isFieldLetters('Firstname Lastname');

      expect(isValid).toStrictEqual(undefined);
    });

    test('Should check if value has a number in it', async () => {
      const isValid = isFieldLetters('1stname Lastname');

      expect(isValid).toStrictEqual('invalid');
    });
  });

  describe('doesNotKnowEmail()', () => {
    test('Should check if user knows the email', async () => {
      const isValid = doesNotKnowEmail({
        doNotKnowRespondentEmailAddress: Checkbox.Checked,
      });

      expect(isValid).toStrictEqual(undefined);
    });

    test('Should check if value has a number in it', async () => {
      const isValid = doesNotKnowEmail({
        respondentEmailAddress: 'test@test.com',
        doNotKnowRespondentEmailAddress: Checkbox.Checked,
      });

      expect(isValid).toStrictEqual('incorrect');
    });
  });

  describe('isEitherFieldsFilledIn()', () => {
    test('Should check if email is at least filled in', async () => {
      const isValid = isRespondentEmailFilledOrNotKnown({
        respondentEmailAddress: 'test@test.com',
      });

      expect(isValid).toStrictEqual(undefined);
    });

    test('Should check if checkbox is checked', async () => {
      const isValid = isRespondentEmailFilledOrNotKnown({
        doNotKnowRespondentEmailAddress: Checkbox.Checked,
      });

      expect(isValid).toStrictEqual(undefined);
    });

    test('Should check if either email is filled or checkbox is checked', async () => {
      const isValid = isRespondentEmailFilledOrNotKnown({});

      expect(isValid).toStrictEqual('required');
    });
  });
});
