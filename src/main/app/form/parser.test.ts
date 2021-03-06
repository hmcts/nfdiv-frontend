import { Step } from '../../steps/sequence';
import { Case } from '../case/case';

import { FormField } from './Form';
import { covertToDateObject, omitUnreachableAnswers, setupCheckboxParser } from './parser';

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
    test('correctly sets up checkbox parser when type is a checkbox', () => {
      const mockFormWithCheckbox = {
        field: {
          type: 'checkboxes',
          values: [
            { name: 'checkbox1', value: 'checked' },
            { name: 'checkbox2', value: 'checked' },
          ],
        } as FormField,
      };

      setupCheckboxParser(Object.entries(mockFormWithCheckbox)[0]);

      const mockFormData = { checkbox1: ['', 'checked'], checkbox2: ['', 'checked'] };
      const actual = mockFormWithCheckbox.field.parser?.(mockFormData);

      expect(actual).toEqual([
        ['checkbox1', 'checked'],
        ['checkbox2', 'checked'],
      ]);
    });
  });

  describe('omitUnreachableAnswers()', () => {
    test('omits unreachable answers', () => {
      const caseStateWithUnreachableAnswers = ({
        valid1: 'pick-me',
        valid2: 'pick-me',
        invalid1: 'dont-pick-me',
      } as unknown) as Partial<Case>;

      const mockSteps = ([
        {
          getNextStep: () => 'next-url',
          form: { fields: { valid1: {} } },
        },
        {
          url: 'next-url',
          getNextStep: () => '',
          form: { fields: { valid2: {} } },
        },
      ] as unknown) as Step[];

      const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

      expect(actual).toEqual({ valid1: 'pick-me', valid2: 'pick-me' });
    });

    test('omits unreachable answers with checkboxes', () => {
      const caseStateWithUnreachableAnswers = ({
        valid1: 'pick-me',
        invalid1: 'dont-pick-me',
      } as unknown) as Partial<Case>;

      const mockSteps = ([
        {
          getNextStep: () => '',
          form: { fields: { someCheckboxes: { type: 'checkboxes', values: [{ name: 'valid1' }] } } },
        },
        {
          url: 'not-this-one',
          getNextStep: () => '',
          form: { fields: { someCheckboxes: { type: 'checkboxes', values: [{ name: 'invalid1' }] } } },
        },
      ] as unknown) as Step[];

      const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

      expect(actual).toEqual({ valid1: 'pick-me' });
    });

    test('omits unreachable answers with subfields', () => {
      const caseStateWithUnreachableAnswers = ({
        valid1: 'pick-me',
        valid2: 'pick-me',
        invalid1: 'dont-pick-me',
      } as unknown) as Partial<Case>;

      const mockSteps = ([
        {
          getNextStep: () => '',
          form: {
            fields: {
              someCheckboxes: {
                type: 'radios',
                values: [{ value: 'Yes', subFields: { valid1: { type: 'text' }, valid2: { type: 'text' } } }],
              },
            },
          },
        },
      ] as unknown) as Step[];

      const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

      expect(actual).toEqual({ valid1: 'pick-me', valid2: 'pick-me' });
    });

    test('omits unreachable answers with date', () => {
      const caseStateWithUnreachableAnswers = ({
        valid1: 'pick-me',
        invalid1: 'dont-pick-me',
      } as unknown) as Partial<Case>;

      const mockSteps = ([
        {
          getNextStep: () => '',
          form: { fields: { valid1: { type: 'date', values: [{ name: 'day' }] } } },
        },
      ] as unknown) as Step[];

      const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

      expect(actual).toEqual({ valid1: 'pick-me' });
    });
  });
});
