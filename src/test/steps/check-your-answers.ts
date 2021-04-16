import { iAmOnPage, iClearTheForm, iClick } from './common';

const { I } = inject();

Given("I've completed all questions correctly to get to the check your answers page", () => {
  iAmOnPage('/your-details');
  iClearTheForm();
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
  iClick('I need help paying the fee');
  iClick('Continue');

  iAmOnPage('/have-you-applied-for-help-with-fees');
  iClearTheForm();
  iClick('Yes');
  iClick('Enter your Help With Fees reference number');
  I.type('HWF-ABC-123');
  iClick('Continue');

  iAmOnPage('/in-the-uk');
  iClick('No');
  iClick('Continue');

  iAmOnPage('/certificate-in-english');
  iClick('No');
  iClick('Continue');

  iAmOnPage('/certified-translation');
  iClick('Yes, I have a certified translation');
  iClick('Continue');

  iAmOnPage('/country-and-place');
  iClearTheForm();
  iClick('Enter the country where you got married');
  I.type('Mozambique');
  iClick('Enter the place where you got married');
  I.type('Maputo');
  iClick('Continue');
});
