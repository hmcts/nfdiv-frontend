import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';

import { config } from '../../config';
import * as I from '../utlis/puppeteer.util';

Given('I am on the homepage', async function() {
  await I.newPage();
  await I.goTo(config.TEST_URL);
});

Then('I expect the page header to be {string}', async function(title: string) {
  const pageTitle = await I.getPageTitle();
  expect(pageTitle).equal(title);
});

When('I click the {string} link', async function(linkText: string) {
  await I.clickLinkWithText(linkText);
});

Then('the page should include {string}', async function(text: string) {
  const body = await I.getElement('body');
  const content = await I.getElementText(body);

  expect(content.includes(text)).equal(true);
});
