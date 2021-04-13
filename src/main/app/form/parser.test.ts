import { FormField } from './Form';
import { covertToDateObject, setupCheckboxParser } from './parser';

describe('Parser', () => {
  describe('covertToDateObject()', () => {
    test('Should covert object with different date properties to 1 property', async () => {
      const date = {
        'date-day': '1',
        'date-month': '1',
        'date-year': '1',
      };

      expect(covertToDateObject('date', date)).toStrictEqual({
        day: '1',
        month: '1',
        year: '1',
      });
    });
  });

  describe('setupCheckboxParser()', () => {
    test.each([
      { isSaveAndSignOut: false, expectedEmpty: '' },
      { isSaveAndSignOut: true, expectedEmpty: null },
    ])('correctly sets up checkbox parser when type is a checkbox for %o', ({ isSaveAndSignOut, expectedEmpty }) => {
      const mockFormWithCheckbox = {
        field: {
          type: 'checkboxes',
          values: [
            { name: 'checkbox1', value: 'checked' },
            { name: 'checkbox2', value: 'checked' },
            { name: 'checkbox3', value: 'checked' },
          ],
        } as FormField,
      };

      setupCheckboxParser(isSaveAndSignOut)(Object.entries(mockFormWithCheckbox)[0]);

      const mockFormData = { checkbox1: ['', 'checked'], checkbox2: '', checkbox3: ['', 'checked'] };
      const actual = mockFormWithCheckbox.field.parser?.(mockFormData);

      expect(actual).toEqual([
        ['checkbox1', 'checked'],
        ['checkbox2', expectedEmpty],
        ['checkbox3', 'checked'],
      ]);
    });
  });
});
