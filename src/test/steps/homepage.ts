import { HOME_URL, YOUR_DETAILS_URL } from '../../main/steps/urls';
import { config } from '../config';

const { I } = inject();

const goToHomePage = () => I.amOnPage(HOME_URL);

Given('I am on divorce homepage', goToHomePage);
When('I go back to the homepage', goToHomePage);

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

Given('I am on civil partnership homepage', () => {
  I.amOnPage(`${YOUR_DETAILS_URL}?forceCivilMode`);
});
