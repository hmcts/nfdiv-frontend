import { iEnterValueIntoInput } from './commonHelpers/elementInteraction';

export const iEnterADateIntoField = (day: string, month: string, year: string, field: string) => {
  iEnterValueIntoInput(day, `#${field}-day`);
  iEnterValueIntoInput(month, `#${field}-month`);
  iEnterValueIntoInput(year, `#${field}-year`);
};

/** Setting the date to the first due to different months having different total number of days **/
Given(/I enter a relationship date (\d+) (?:month|months) ago/, (month: string) => {
  const date = new Date();
  date.setDate(1);
  date.getMonth() - +month === 0 ? date.setMonth(1) : date.setMonth(date.getMonth() - +month);
  iEnterADateIntoField(date.getDate().toString(), (date.getMonth() + 1).toString(), date.getFullYear().toString(), 'relationshipDate');
});

Given(/I enter a relationship date (\d+) (?:year|years) ahead/, (year: string) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + +year);
  iEnterADateIntoField(date.getDate().toString(), (date.getMonth() + 1).toString(), date.getFullYear().toString(), 'relationshipDate');
});
