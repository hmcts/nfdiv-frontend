import { SupportedLanguages } from '../../../modules/i18n';
import { CaseDate } from '../case';

import { getFormattedCaseDate, getFormattedDate } from './formatDate';

describe('Format case date', () => {
  describe('getFormattedCaseDate()', () => {
    it('returns a formatted case date when date is set', () => {
      expect(getFormattedCaseDate({ year: '1999', month: '12', day: '31' })).toBe('31 December 1999');
    });

    it('returns a formatted case date when date is set and language is set to Welsh', () => {
      expect(getFormattedCaseDate({ year: '1999', month: '12', day: '31' }, SupportedLanguages.Cy)).toBe(
        '31 Rhagfyr 1999'
      );
    });

    it('returns a single day digit date when date is set', () => {
      expect(getFormattedCaseDate({ year: '1999', month: '12', day: '1' })).toBe('1 December 1999');
    });

    it('returns false when the date is not set', () => {
      expect(getFormattedCaseDate(undefined)).toBe(false);
    });

    it('returns false when the date is incomplete', () => {
      expect(getFormattedCaseDate({ year: '', month: '', day: '' } as unknown as CaseDate)).toBe(false);
    });
  });

  describe('getFormattedDate()', () => {
    it('returns a date when to the correct formatted date', () => {
      expect(getFormattedDate('2021-07-26')).toBe('26 July 2021');
    });

    it('returns a date when to the correct formatted date and language is set to Welsh', () => {
      expect(getFormattedDate('2021-07-26', SupportedLanguages.Cy)).toBe('26 Gorffennaf 2021');
    });

    it('returns a single day digit date to the correct formatted date', () => {
      expect(getFormattedDate('2021-07-01')).toBe('1 July 2021');
    });

    it('returns false when the date is not set', () => {
      expect(getFormattedDate(undefined)).toBe(false);
    });

    it('returns false when the date is incomplete', () => {
      expect(getFormattedDate('')).toBe(false);
    });
  });
});
