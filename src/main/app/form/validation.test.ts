import { CaseDate } from '../case/case';

import {
  areFieldsFilledIn,
  isDateInputValid,
  isFieldFilledIn,
  isFutureDate,
  isInvalidHelpWithFeesRef,
  isLessThanAYear,
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

  describe('isDateInputValid()', () => {
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
      const isValid = isDateInputValid((date as unknown) as CaseDate);

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
});
