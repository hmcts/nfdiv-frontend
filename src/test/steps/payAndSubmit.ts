import {
  APPLICATION_SUBMITTED,
  GENERAL_APPLICATION_SUBMITTED,
  HUB_PAGE,
  JOINT_APPLICATION_SUBMITTED,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PAY_YOUR_FINAL_ORDER_FEE,
  PAY_YOUR_GENERAL_APPLICATION_FEE,
  PAY_YOUR_SERVICE_FEE,
  PageLink,
  RESPONDENT,
  SERVICE_APPLICATION_SUBMITTED,
  getPageTitleIdFromUrl,
} from '../../main/steps/urls';

import {
  WaitUntil,
  iClickSubmit,
  iClickSubmitAndExpectUrl,
  iEnterValueIntoInput,
} from './commonHelpers/elementInteraction';
import { iWaitInUrl, iWaitInUrlAsUser } from './commonHelpers/navigation';

const completePayment = async (nextUrl?: string, wait?: number, waitUntil?: WaitUntil, titleSelector?: string) => {
  const cardDetailsUrl = '/card_details';
  iWaitInUrl(cardDetailsUrl, wait);
  iEnterValueIntoInput('4444333322221111', '#card-no', wait);
  iEnterValueIntoInput('12', '#expiry-month');
  iEnterValueIntoInput('30', '#expiry-year');
  iEnterValueIntoInput('Nightly test', '#cardholder-name');
  iEnterValueIntoInput('123', '#cvc');
  iEnterValueIntoInput('BUCKINGHAM PALACE', '#address-line-1');
  iEnterValueIntoInput('LONDON', '#address-city');
  iEnterValueIntoInput('SW1A 1AA', '#address-postcode');
  iEnterValueIntoInput('nightly-functional-test@example.com', '#email');
  await iClickSubmit();
  iWaitInUrl(cardDetailsUrl);
  await iClickSubmitAndExpectUrl(nextUrl, wait, waitUntil, titleSelector);
};

const getSavedOrSubmittedSelector = (savedOrSubmitted: string): string => {
  const titleId: string = getPageTitleIdFromUrl(APPLICATION_SUBMITTED as PageLink);
  return `#${titleId}[data-saved-or-submitted="${savedOrSubmitted}"]`;
};

Given('I pay and submit and expect the application to be saved', async () => {
  iWaitInUrl(PAY_YOUR_FEE);
  await iClickSubmit();

  await completePayment(APPLICATION_SUBMITTED, 15, undefined, getSavedOrSubmittedSelector('Saved'));
});

Given('I pay and submit the application', async () => {
  iWaitInUrl(PAY_YOUR_FEE);
  await iClickSubmit();

  await completePayment(APPLICATION_SUBMITTED, 15, undefined, getSavedOrSubmittedSelector('Submitted'));
});

Given('I pay and submit the service application', async () => {
  iWaitInUrl(PAY_YOUR_SERVICE_FEE);
  await iClickSubmit();

  await completePayment(SERVICE_APPLICATION_SUBMITTED, 15);
});

Given('I pay and submit the general application', async () => {
  iWaitInUrl(PAY_YOUR_GENERAL_APPLICATION_FEE);
  await iClickSubmit();

  await completePayment(GENERAL_APPLICATION_SUBMITTED, 15);
});

Given('I pay and submit the final order application', async () => {
  iWaitInUrlAsUser(PAY_YOUR_FINAL_ORDER_FEE, RESPONDENT);
  await iClickSubmit();

  await completePayment(RESPONDENT + HUB_PAGE, 15);
});

Given('I pay and submit the joint application', async () => {
  iWaitInUrl(PAY_AND_SUBMIT);
  await iClickSubmit();

  await completePayment(JOINT_APPLICATION_SUBMITTED, 15);
});
