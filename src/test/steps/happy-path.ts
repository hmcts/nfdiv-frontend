import {
  checkOptionFor,
  iAmOnPage,
  iClearTheForm,
  iClick,
  iResetThePostCodeLookUpForm,
  iWaitForPostcodeLookUpResults,
} from './common';

const { I } = inject();

Given("I've completed all happy path questions correctly to get to check your answers page", () => {
  iAmOnPage('/your-details');
  iClearTheForm();
  iClick('My husband');
  iClick('Continue');

  I.waitUrlEquals('/irretrievable-breakdown');
  iClick('Yes, my marriage has irretrievably broken down');
  iClick('Continue');

  I.waitUrlEquals('/date-from-certificate');
  iClearTheForm();
  iClick('Day');
  I.type('31');
  iClick('Month');
  I.type('12');
  iClick('Year');
  I.type('1999');
  iClick('Continue');

  I.waitUrlEquals('/do-you-have-your-certificate');
  iClick('Yes, I have my marriage certificate');
  iClick('Continue');

  I.waitUrlEquals('/help-with-your-fee');
  iClick('I do not need help paying the fee');
  iClick('Continue');

  I.waitUrlEquals('/in-the-uk');
  iClick('Yes');
  iClick('Continue');

  I.waitUrlEquals('/check-jurisdiction');
  iClick('Continue');

  I.waitUrlEquals('/where-your-lives-are-based');
  checkOptionFor('Yes', 'Is your life mainly based in England or Wales?');
  checkOptionFor('Yes', 'Is your husband’s life mainly based in England or Wales?');
  iClick('Continue');

  I.waitUrlEquals('/you-can-use-english-welsh-courts');
  iClick('Continue');

  I.waitUrlEquals('/your-names-on-certificate');
  iClearTheForm();
  iClick('Copy your full name');
  I.type('First name Last name');
  iClick("Copy your husband's full name");
  I.type('Husbands name');
  iClick('Continue');

  I.waitUrlEquals('/changes-to-your-name');
  checkOptionFor('No', 'Did you change your last name when you got married?');
  checkOptionFor('No', 'Have you changed any part of your name since getting married?');
  iClick('Continue');

  I.waitUrlEquals('/how-the-court-will-contact-you');
  iClearTheForm();
  iClick('I agree that the divorce service can send me notifications');
  iClick('Continue');

  I.waitUrlEquals('/english-or-welsh');
  iClick('English');
  iClick('Continue');

  I.waitUrlEquals('/address-private');
  iClick('I do not need my contact details kept private');
  iClick('Continue');

  I.waitUrlEquals('/enter-your-address');
  iResetThePostCodeLookUpForm();
  iClick('Enter a UK postcode');
  I.type('SW1A 1AA');
  iClick('Find address');
  iWaitForPostcodeLookUpResults();
  I.selectOption('Select an address', 'BUCKINGHAM PALACE, LONDON, SW1A 1AA');
  iClick('Continue');

  I.waitUrlEquals('/their-email-address');
  iClearTheForm();
  iClick("Your husband's email address");
  I.type('husband@example.com');
  iClick('Continue');

  I.waitUrlEquals('/do-you-have-address');
  iClick('Yes, I have their address');
  iClick('Continue');

  I.waitUrlEquals('/enter-their-address');
  iResetThePostCodeLookUpForm();
  iClick('Enter a UK postcode');
  I.type('SW1H 9AJ');
  iClick('Find address');
  iWaitForPostcodeLookUpResults();
  I.selectOption('Select an address', 'MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ');
  iClick('Continue');

  I.waitUrlEquals('/other-court-cases');
  iClick('No');
  iClick('Continue');

  I.waitUrlEquals('/money-property');
});
