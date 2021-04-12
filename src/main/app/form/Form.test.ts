import { Case, CaseDate, Checkbox } from '../case/case';
import { YesOrNo } from '../case/definition';

import { Form, FormContent } from './Form';
import { covertToDateObject } from './parser';
import { areFieldsFilledIn, isFieldFilledIn } from './validation';

describe('Form', () => {
  const mockForm: FormContent = {
    fields: {
      field: {
        type: 'radios',
        values: [
          { label: l => l.no, value: YesOrNo.YES },
          { label: l => l.yes, value: YesOrNo.NO },
        ],
        validator: jest.fn().mockImplementation(isFieldFilledIn),
      },
      dateField: {
        type: 'date',
        values: [
          { label: l => l.dateFormat['day'], name: 'day' },
          { label: l => l.dateFormat['month'], name: 'month' },
          { label: l => l.dateFormat['year'], name: 'year' },
        ],
        parser: value => covertToDateObject('dateField', value),
        validator: value => areFieldsFilledIn(value as CaseDate),
      },
      someCheckboxes: {
        type: 'checkboxes',
        values: [
          { name: 'optionalCheckbox', label: () => 'optional', value: Checkbox.Checked },
          {
            name: 'requiredCheckbox',
            label: () => 'required checkbox',
            value: Checkbox.Checked,
            validator: isFieldFilledIn,
          },
        ],
      },
    },
    submit: {
      text: l => l.continue,
    },
  };

  const form = new Form(mockForm);

  test('Should validate a form', async () => {
    const errors = form.getErrors(({
      field: YesOrNo.YES,
      dateField: {
        day: '1',
        month: '1',
        year: '2000',
      },
      requiredCheckbox: Checkbox.Checked,
      doNotKnowRespondentEmailAddress: Checkbox.Checked,
    } as unknown) as Case);

    expect(mockForm.fields.field.validator).toHaveBeenCalledWith(YesOrNo.YES, {
      field: YesOrNo.YES,
      dateField: { day: '1', month: '1', year: '2000' },
      requiredCheckbox: Checkbox.Checked,
      doNotKnowRespondentEmailAddress: Checkbox.Checked,
    });
    expect(errors).toStrictEqual([]);
  });

  test('Should validate a form and return error', async () => {
    const errors = form.getErrors({});

    expect(errors).toStrictEqual([
      {
        propertyName: 'field',
        errorType: 'required',
      },
      {
        propertyName: 'dateField',
        errorType: 'required',
      },
      {
        propertyName: 'someCheckboxes',
        errorType: 'required',
      },
    ]);
  });

  describe('subfield validation', () => {
    const mockSubFieldForm: FormContent = {
      fields: {
        field: {
          type: 'radios',
          values: [
            {
              label: l => l.no,
              value: YesOrNo.NO,
              subFields: {
                testSubField: {
                  type: 'text',
                  label: 'Subfield',
                  validator: isFieldFilledIn,
                },
              },
            },
            { label: l => l.yes, value: YesOrNo.YES },
          ],
          validator: isFieldFilledIn,
        },
      },
      submit: {
        text: l => l.continue,
      },
    };

    const subFieldForm = new Form(mockSubFieldForm);

    it('returns the field error', () => {
      const errors = subFieldForm.getErrors({});

      expect(errors).toStrictEqual([
        {
          propertyName: 'field',
          errorType: 'required',
        },
      ]);
    });

    it('does not return any subfields error if the field has not been selected', () => {
      const errors = subFieldForm.getErrors(({ field: YesOrNo.YES } as unknown) as Case);

      expect(errors).toStrictEqual([]);
    });

    it('returns the subfield error when the field has been selected', () => {
      const errors = subFieldForm.getErrors(({ field: YesOrNo.NO } as unknown) as Case);

      expect(errors).toStrictEqual([
        {
          errorType: 'required',
          propertyName: 'testSubField',
        },
      ]);
    });
  });

  test('Should parse a form body', async () => {
    const body = {
      field: YesOrNo.YES,
      'dateField-day': '1',
      'dateField-month': '1',
      'dateField-year': '2000',
      optionalCheckbox: [''],
      requiredCheckbox: ['', Checkbox.Checked],
    };

    expect(form.getParsedBody(body)).toStrictEqual({
      field: 'YES',
      dateField: {
        day: '1',
        month: '1',
        year: '2000',
      },
      optionalCheckbox: '',
      requiredCheckbox: 'checked',
    });
  });

  test('returns all of the field name for the current form', () => {
    expect(form.getFieldNames()).toEqual(new Set(['field', 'dateField', 'optionalCheckbox', 'requiredCheckbox']));
  });

  describe('isComplete()', () => {
    test('returns false if none of the fields are complete', () => {
      expect(form.isComplete({})).toBe(false);
    });

    test('returns false if all the fields are null/incomplete', () => {
      expect(
        form.isComplete(({
          field: null,
          dateField: null,
          optionalCheckbox: null,
          requiredCheckbox: null,
        } as unknown) as Case)
      ).toBe(false);
    });

    test('returns true if all the fields have been completed with empty data', () => {
      expect(
        form.isComplete(({
          field: '',
          dateField: '',
          optionalCheckbox: Checkbox.Unchecked,
          requiredCheckbox: Checkbox.Unchecked,
        } as unknown) as Case)
      ).toBe(true);
    });
  });
});
