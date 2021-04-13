import { CaseDate, Checkbox } from '../case/case';

import { FormField, FormOptions } from './Form';

export type DateParser = (property: string, body: Record<string, unknown>) => CaseDate;

export const covertToDateObject: DateParser = (property, body) =>
  ['day', 'month', 'year'].reduce(
    (newDateObj: CaseDate, date: string) => {
      const propertyName = `${property}-${date}`;
      newDateObj[date] = body[propertyName];
      delete body[propertyName];
      return newDateObj;
    },
    { year: '', month: '', day: '' }
  );

type CheckboxParser = (isSavingAndSigningOut: boolean) => ([key, field]: [string, FormField]) => [string, FormField];

export const setupCheckboxParser: CheckboxParser = isSavingAndSigningOut => ([key, field]) => {
  if ((field as FormOptions)?.type === 'checkboxes') {
    field.parser = formData =>
      (field as FormOptions).values.reduce((previous, currentCheckbox) => {
        const checkboxName = currentCheckbox.name as string;
        const checkboxValues = formData[checkboxName] as string | string[];
        let checkboxValue: string | null = Array.isArray(checkboxValues)
          ? checkboxValues[checkboxValues.length - 1]
          : checkboxValues;

        if (isSavingAndSigningOut && checkboxValue === Checkbox.Unchecked) {
          checkboxValue = null;
        }

        return [...previous, [checkboxName, checkboxValue]];
      }, [] as (string | null)[][]);
  }
  return [key, field];
};
