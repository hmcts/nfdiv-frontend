import { iAmOnPage, iClearTheForm, iClick } from './common';

const { I } = inject();

Given("I've completed all questions correctly to get to the jurisdiction section", () => {
  iAmOnPage('/your-details');
  iClick('My husband');
  iClick('Continue');

  iAmOnPage('/irretrievable-breakdown');
  iClick('Yes, my marriage has irretrievably broken down');
  iClick('Continue');

  iAmOnPage('/date-from-certificate');
  iClearTheForm();
  iClick('Day');
  I.type('31');
  iClick('Month');
  I.type('12');
  iClick('Year');
  I.type('1999');
  iClick('Continue');

  iAmOnPage('/do-you-have-your-certificate');
  iClick('Yes, I have my marriage certificate');
  iClick('Continue');

  iAmOnPage('/help-with-your-fee');
  iClick('I do not need help paying the fee');
  iClick('Continue');

  iAmOnPage('/in-the-uk');
  iClick('Yes');
  iClick('Continue');
});
