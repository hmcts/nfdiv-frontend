import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';

import { config } from '../../config';
import * as I from '../utlis/puppeteer.util';

Given('I am on divorce homepage', async function () {
  await I.newPage();
  await I.goTo(config.TEST_URL);
});

Then('I expect the page header to be {string}', async function (title: string) {
  const pageTitle = await I.getPageTitle();
  expect(pageTitle).equal(title);
});

Given('I am on the admin portal sign in page', async () => {
  const element = await I.getElement('h1');
  const text = await I.getElementText(element);
  expect(text).equal('Sign in or create an account');
});

When(
  'I fill in the Username and Password fields with my authenticated credentials {string} {string}',
  async (username: string, password: string) => {
    const usernameEl = await I.checkElement('#username');
    expect(usernameEl).equal(true);
    await I.fillField('#username', username);

    const passwordEl = await I.checkElement('#password');
    expect(passwordEl).equal(true);
    await I.fillField('#password', password);
  }
);

Given('click the Sign In button', async () => {
  await I.click('.button');
});

When('I click the {string} link', async function (linkText: string) {
  await I.clickLinkWithText(linkText);
});

Then('the page should include {string}', async function (text: string) {
  const body = await I.getElement('body');
  const content = await I.getElementText(body);

  expect(content?.includes(text)).equal(true);
});

Given('I am on civil partnership homepage', async function () {
  await I.newPage();
  await I.goTo(config.TEST_URL + '?forceCivilMode');
});
