import {Then, When} from 'cucumber';
import * as I from '../utlis/puppeteer.util';
import { expect } from 'chai';


When('I can select the privacy policy link in the footer', async () => {
  const elementExist = await I.checkElement('body > footer > div > div > div.govuk-footer__meta-item.govuk-footer__meta-item--grow > ul > li:nth-child(1) > a');
  expect(elementExist).equal(true);
  await I.click('body > footer > div > div > div.govuk-footer__meta-item.govuk-footer__meta-item--grow > ul > li:nth-child(1) > a');
});

Then('I expect the page title to be {string}', async function(title: string) {
  const titleElement = await I.getElement('#main-content > h1');
  const titleText = await I.getElementText(titleElement);
  expect(titleText).equal(title);
});
