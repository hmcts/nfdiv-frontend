import { CaseDate } from '../../app/case/case';

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

type CheckboxParser = ([key, field]: [string, FormField]) => [string, FormField];

export const setupCheckboxParser: CheckboxParser = ([key, field]) => {
  if ((field as FormOptions)?.type === 'checkboxes') {
    field.parser = formData =>
      (field as FormOptions).values.reduce((previous, currentCheckbox) => {
        const checkboxName = currentCheckbox.name as string;
        const checkboxValue = formData[checkboxName] as string[];
        return [...previous, [checkboxName, checkboxValue[checkboxValue.length - 1]]];
      }, [] as string[][]);
  }
  return [key, field];
};
