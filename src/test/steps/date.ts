import { iClick } from './common';

const { I } = inject();

const enterDate = (day: string, month: string, year: string) => {
  iClick('Day');
  I.type(day);
  iClick('Month');
  I.type(month);
  iClick('Year');
  I.type(year);
};

Given(/I enter a date (\d+) (?:month|months) ago/, (month: string) => {
  const date = new Date();
  date.setMonth(date.getMonth() - +month);
  enterDate(date.getDay().toString(), date.getMonth().toString(), date.getFullYear().toString());
});

Given(/I enter a date (\d+) (?:year|years) ahead/, (year: string) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + +year);
  enterDate(date.getDate().toString(), date.getMonth().toString(), date.getFullYear().toString());
});
