import { iAmOnPage, iClearTheForm, iClick } from './common';

const { I } = inject();

Given("I've completed all questions correctly to get to the check your answers page", () => {
  iAmOnPage('/your-details');
  iClick('My husband');
  iClick('Continue');

  iClick('Yes, my marriage has irretrievably broken down');
  iClick('Continue');

  iClearTheForm();
  iClick('Day');
  I.type('31');
  iClick('Month');
  I.type('12');
  iClick('Year');
  I.type('1999');
  iClick('Continue');

  iClick('Yes, I have my marriage certificate');
  iClick('Continue');

  iClick('I need help paying the fee');
  iClick('Continue');

  iClearTheForm();
  iClick('Yes');
  iClick('Enter your Help With Fees reference number');
  I.type('HWF-ABC-123');
  iClick('Continue');

  iClick('No');
  iClick('Continue');

  iClick('No');
  iClick('Continue');

  iClick('Yes, I have a certified translation');
  iClick('Continue');

  iClearTheForm();
  iClick('Enter the country where you got married');
  I.type('Mozambique');
  iClick('Enter the place where you got married');
  I.type('Maputo');
  iClick('Continue');
});
