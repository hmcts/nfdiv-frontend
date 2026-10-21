import { Logger as hmctsLogger } from '@hmcts/nodejs-logging';
import { tryTo } from 'codeceptjs/effects';

import { iClearTheForm, iClickElement, iEnterValueIntoInput } from './commonHelpers/elementInteraction';

const logger = hmctsLogger.getLogger('common-steps');
const { I } = inject();

export const iWaitForPostcodeLookUpResults = async (): Promise<void> => {
  I.waitForElement('#selectAddressInput');
  I.waitForElement('option[value^="{\\"fullAddress"]', 10);
};
Then('I wait for the postcode lookup to return results', iWaitForPostcodeLookUpResults);

export const iResetThePostCodeLookUpForm = async (): Promise<void> => {
  await iClearTheForm();

  const visibleReset = await tryTo(() => I.waitForVisible('#resetPostcodeLookup', 1));
  if (visibleReset) {
    iClickElement('#resetPostcodeLookup');
  } else {
    logger.warn('Reset postcode element not found, continuing with cleared form.');
  }
};
Given('I reset the postcode lookup form', iResetThePostCodeLookUpForm);

export const iEnterTheUkAddress = async (address: string): Promise<void> => {
  const addressParts = address.split(', ');
  const postcode = addressParts[addressParts.length - 1];

  await iResetThePostCodeLookUpForm();

  try {
    iEnterValueIntoInput(postcode, '#postcode');
    iClickElement('#findAddressButton');
    await iWaitForPostcodeLookUpResults();
    I.waitForText(postcode);
    I.selectOption('#selectAddressInput', address);
  } catch (e) {
    logger.warn('Warning: Postcode lookup service failed, entering address manually', e);
    iClickElement('#cannotFindAddress');
    iEnterValueIntoInput(addressParts[0], '#address1');
    iEnterValueIntoInput(addressParts[1], '#addressTown');
    iEnterValueIntoInput(postcode, '#addressPostcode');
    iEnterValueIntoInput('UK', '#addressCountry');
  }
};
Given('I enter the UK address {string}', iEnterTheUkAddress);
