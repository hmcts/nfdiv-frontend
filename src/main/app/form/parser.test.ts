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
        day: '01',
        month: '01',
        year: '1',
      });
    });
  });

  describe('setupCheckboxParser()', () => {
    test('correctly sets up checkbox parser when type is a checkbox', () => {
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

      setupCheckboxParser(Object.entries(mockFormWithCheckbox)[0]);

      const mockFormData = { checkbox1: ['', 'checked'], checkbox2: '', checkbox3: ['', 'checked'] };
      const actual = mockFormWithCheckbox.field.parser?.(mockFormData);

      expect(actual).toEqual([
        ['checkbox1', 'checked'],
        ['checkbox2', ''],
        ['checkbox3', 'checked'],
      ]);
    });
  });
});
