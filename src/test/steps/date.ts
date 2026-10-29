import { iEnterValueIntoInput } from './commonHelpers/elementInteraction';

const defaultRelationshipDate = '1/1/2000';

export const iEnterADateIntoField = (date: string, field: string): void => {
  const [day, month, year] = date
    .trim()
    .split(/[/.\-\s]+/)
    .map(part => part.trim());

  iEnterValueIntoInput(day, `#${field}-day`);
  iEnterValueIntoInput(month, `#${field}-month`);
  iEnterValueIntoInput(year, `#${field}-year`);
};

const dateToString = (date: Date): string => {
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
};

Given('I enter a date of {string} into the {string} field', (date, field: string) => {
  iEnterADateIntoField(date, field);
});
Given('I enter the relationship date', () => {
  iEnterADateIntoField(defaultRelationshipDate, 'relationshipDate');
});

/** Setting the date to the first due to different months having different total number of days **/
Given(/I enter a relationship date (\d+) (?:month|months) ago/, (month: string) => {
  const date = new Date();
  date.setDate(1);
  if (date.getMonth() - +month === 0) {
    date.setMonth(1);
  } else {
    date.setMonth(date.getMonth() - +month);
  }
  iEnterADateIntoField(dateToString(date), 'relationshipDate');
});

Given(/I enter a relationship date (\d+) (?:year|years) ahead/, (year: string) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + +year);
  iEnterADateIntoField(dateToString(date), 'relationshipDate');
});
