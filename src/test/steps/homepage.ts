import { PARTNER_GENDER_URL } from '../../main/steps/urls';
import { config } from '../config';

const { I } = inject();

Given('I am on divorce homepage', () => {
  I.amOnPage('/');
});

Given('I see the divorce homepage', () => {
  I.waitForText('Apply for a divorce');
});

Given('I am on the admin portal sign in page', () => {
  I.waitForText('Sign in or create an account');
});

When('I fill in the Username and Password fields with a valid login', () => {
  I.fillField('username', config.TestUser);
  I.fillField('password', config.TestPass);
});

Given('click the Sign In button', () => {
  I.click('Sign in');
});

Then('I expect the page header to be {string}', (title: string) => {
  I.seeInTitle(title);
});

When('I click the {string} link', (linkText: string) => {
  I.waitForText(linkText);
  I.click(linkText);
});

Then('the page should include {string}', (text: string) => {
  I.see(text);
});

Given('I am on civil partnership homepage', () => {
  I.amOnPage(`${PARTNER_GENDER_URL}?forceCivilMode`);
});
