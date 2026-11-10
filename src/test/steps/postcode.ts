import { Logger as hmctsLogger } from '@hmcts/nodejs-logging';

import {
  iClearTheForm,
  iClickElement,
  iEnterValueIntoInput,
  iWaitForVisible,
} from './commonHelpers/elementInteraction';
import { iClickToNavigate, iGrabCurrentUrl } from './commonHelpers/navigation';

const logger = hmctsLogger.getLogger('common-steps');
const { I } = inject();

export const DEFAULT_ADDRESS = 'MINISTRY OF JUSTICE, SEVENTH FLOOR, 102, PETTY FRANCE, LONDON, SW1H 9AJ';

export const iWaitForPostcodeLookUpResults = async (): Promise<void> => {
  iWaitForVisible('#selectAddressInput', 10);
  I.waitForElement('#selectAddressInput > option[value^="{\\"fullAddress"]', 10);
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

export const getDefaultPostcode = (): string => {
  const addressParts = DEFAULT_ADDRESS.split(', ');
  return addressParts[addressParts.length - 1];
};

export const iEnterPostcode = (postcode: string): void => {
  iEnterValueIntoInput(postcode, '#postcode');
};

export const iClickFindAddress = async (wait?: number): Promise<void> => {
  const nextUrl = await iGrabCurrentUrl();
  await iClickToNavigate('#findAddressButton', wait, nextUrl);
};

export const iClickCannotFindAddress = (wait?: number): void => {
  iClickElement('#cannotFindAddress', wait);
};

const splitUkAddress = (address: string): { addressParts: string[]; postcode: string } => {
  const addressParts = address.split(', ');
  const postcode = addressParts[addressParts.length - 1];
  return { addressParts, postcode };
};

export const iEnterTheUkAddressIntoFields = (address: string): void => {
  const { addressParts, postcode } = splitUkAddress(address);

  iEnterValueIntoInput(addressParts[0], '#address1');
  iEnterValueIntoInput(addressParts[1], '#addressTown');
  iEnterValueIntoInput(postcode, '#addressPostcode');
  iEnterValueIntoInput('UK', '#addressCountry');
};

export const iEnterTheUkAddress = async (address: string): Promise<void> => {
  const { postcode } = splitUkAddress(address);

  await iResetThePostCodeLookUpForm();

  try {
    iEnterPostcode(postcode);
    await iClickFindAddress();
    await iWaitForPostcodeLookUpResults();
    I.waitForText(postcode);
    I.selectOption('#selectAddressInput', address);
  } catch (e) {
    logger.warn('Warning: Postcode lookup service failed, entering address manually', e);
    iClickCannotFindAddress();
    iEnterTheUkAddressIntoFields(address);
  }
};
Given('I enter the UK address {string}', iEnterTheUkAddress);
Given('I enter my address', async () => {
  await iEnterTheUkAddress(DEFAULT_ADDRESS);
});
Given('I enter their address', async () => {
  await iEnterTheUkAddress(DEFAULT_ADDRESS);
});
Given('I enter my address directly', () => {
  iEnterTheUkAddressIntoFields(DEFAULT_ADDRESS);
});

export const iClickCannotEnterUkPostcode = (): void => {
  iClickElement('#cannot-enter-uk-postcode');
};

export const iEnterTheInternationalAddress = async (address: string): Promise<void> => {
  const addressParts = address.split(', ');
  const country = address === DEFAULT_ADDRESS ? 'Other Country' : addressParts[addressParts.length - 1];

  await iResetThePostCodeLookUpForm();

  iClickCannotEnterUkPostcode();
  iEnterValueIntoInput(addressParts[0], '#address1');
  iEnterValueIntoInput(country, '#addressCountry');
};
Given('I enter the international address {string}', iEnterTheInternationalAddress);
Given('I enter my international address', async () => {
  await iEnterTheInternationalAddress(DEFAULT_ADDRESS);
});
Given('I enter their international address', async () => {
  await iEnterTheInternationalAddress(DEFAULT_ADDRESS);
});
