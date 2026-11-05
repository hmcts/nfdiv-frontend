import { iEnterValueIntoInput } from './commonHelpers/elementInteraction';

export const DEFAULT_RELATIONSHIP_DATE = '1/1/2000';

export const dateToString = (date: Date): string => {
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
};

export const iEnterADateIntoField = (date: string, field: string): void => {
  const [day, month, year] = date
    .trim()
    .split(/[/.\-\s]+/)
    .map(part => part.trim());

  iEnterValueIntoInput(day, `#${field}-day`);
  iEnterValueIntoInput(month, `#${field}-month`);
  iEnterValueIntoInput(year, `#${field}-year`);
};

export const iEnterTheDefaultRelationshipDate = (): void => {
  iEnterADateIntoField(DEFAULT_RELATIONSHIP_DATE, 'relationshipDate');
};

Given('I enter a date of {string} into the {string} field', (date, field: string) => {
  iEnterADateIntoField(date, field);
});
Given('I enter the relationship date', () => {
  iEnterTheDefaultRelationshipDate();
});
