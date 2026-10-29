import { Logger as hmctsLogger } from '@hmcts/nodejs-logging';

import { iClearTheForm, iClickElement, iEnterValueIntoInput } from './commonHelpers/elementInteraction';

const logger = hmctsLogger.getLogger('common-steps');
const { I } = inject();

const defaultAddress = 'MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ';

export const iWaitForPostcodeLookUpResults = async (): Promise<void> => {
  I.waitForElement('#selectAddressInput');
  I.waitForElement('option[value^="{\\"fullAddress"]', 10);
};
Then('I wait for the postcode lookup to return results', iWaitForPostcodeLookUpResults);

export const iResetThePostCodeLookUpForm = async (): Promise<void> => {
  await iClearTheForm();

  const visibleReset = (await I.grabNumberOfVisibleElements('#resetPostcodeLookup')) > 0;
  if (visibleReset) {
    iClickElement('#resetPostcodeLookup');
  } else {
    logger.info('Reset postcode element not found, continuing with cleared form.');
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
Given('I enter my address', async () => {
  await iEnterTheUkAddress(defaultAddress);
});

export const iEnterTheInternationalAddress = async (address: string): Promise<void> => {
  const addressParts = address.split(', ');
  const country = address === defaultAddress ? 'UK' : addressParts[addressParts.length - 1];

  await iResetThePostCodeLookUpForm();

  iClickElement('#cannot-enter-uk-postcode');
  iEnterValueIntoInput(addressParts[0], '#address1');
  iEnterValueIntoInput(country, '#addressCountry');
};
Given('I enter the international address {string}', iEnterTheInternationalAddress);
Given('I enter my international address', async () => {
  await iEnterTheInternationalAddress(defaultAddress);
});
