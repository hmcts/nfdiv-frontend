import { iEnterValueIntoInput } from './commonHelpers/elementInteraction';

export const DEFAULT_DATE = '1/1/2000';

const splitDateString = (date: string): [string, string, string] => {
  const [day, month, year] = date
    .trim()
    .split(/[/.\-\s]+/)
    .map(part => part.trim());
  return [day, month, year];
};

export const dateToString = (date: Date): string => {
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
};

export const dateStringToApi = (date: string): string => {
  const [day, month, year] = splitDateString(date);
  return year + '-' + month.padStart(2, '0') + '-' + day.padStart(2, '0');
};

export const iEnterADateIntoField = (date: string, field: string): void => {
  const [day, month, year] = splitDateString(date);

  iEnterValueIntoInput(day, `#${field}-day`);
  iEnterValueIntoInput(month, `#${field}-month`);
  iEnterValueIntoInput(year, `#${field}-year`);
};

export const iEnterTheDefaultRelationshipDate = (): void => {
  iEnterADateIntoField(DEFAULT_DATE, 'relationshipDate');
};

Given('I enter a date of {string} into the {string} field', (date, field: string) => {
  iEnterADateIntoField(date, field);
});
Given('I enter the relationship date', () => {
  iEnterTheDefaultRelationshipDate();
});
