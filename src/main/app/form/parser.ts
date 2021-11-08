import { CaseDate } from '../case/case';

import { FormField, FormOptions } from './Form';

type DateParser = (property: string, body: Record<string, unknown>) => CaseDate;
type CheckboxParser = (isSavingAndSigningOut: boolean) => ([key, field]: [string, FormField]) => [string, FormField];
type UnreachableAnswersParser = (condition: boolean, properties: string[]) => (string | null)[][];

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

export const setupCheckboxParser: CheckboxParser =
  isSavingAndSigningOut =>
  ([key, field]) => {
    if ((field as FormOptions)?.type === 'checkboxes') {
      field.parser = formData => {
        const checkbox = formData[key] ?? [];
        let checkboxValues;
        if ((field as FormOptions).values.length > 1) {
          checkboxValues = checkbox.filter(Boolean);
        } else {
          checkboxValues = checkbox[checkbox.length - 1];
        }

        if (isSavingAndSigningOut && !checkboxValues) {
          checkboxValues = null;
        }

        return [[key, checkboxValues]];
      };
    }
    return [key, field];
  };

export const setUnreachableAnswers: UnreachableAnswersParser = (condition, properties) => {
  if (condition) {
    return properties.map(property => [property, null]);
  }
  return [];
};
