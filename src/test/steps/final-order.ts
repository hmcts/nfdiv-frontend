import { HOW_TO_FINALISE_APPLICATION, HUB_PAGE } from '../../main/steps/urls';

import { iCheckOption, iClickSubmitAndExpectUrl, iEnterValueIntoInput } from './commonHelpers/elementInteraction';
import { iClickToNavigate } from './commonHelpers/navigation';
import { getApplicantString, getCapitalisedApplicantString } from './commonHelpers/userInteraction';
import { iSubmitToApplyForFinalOrderAsSoleApplicant, prepareTheCaseForSwitchToSoleFinalOrder } from './switchToSole';

When('I click apply for final order', async () => {
  await iClickToNavigate('#applyForFinalOrderButton');
});
When('I click apply for final order and expect URL {string}', async (url: string) => {
  await iClickToNavigate('#applyForFinalOrderButton', undefined, url);
});

Given('I want to finalise my divorce', () => {
  iCheckOption(`#does${getCapitalisedApplicantString()}WantToApplyForFinalOrder`);
});

Given('I prepare the case for applicant {string} switch-to-sole final order', async (applicantIndex: string) => {
  await prepareTheCaseForSwitchToSoleFinalOrder(applicantIndex);
});
Given(
  'I prepare the case for applicant {string} switch-to-sole when final order overdue',
  async (applicantIndex: string) => {
    await prepareTheCaseForSwitchToSoleFinalOrder(applicantIndex, true);
  }
);

Given('I intend to apply for final order as a sole applicant', async () => {
  await iClickToNavigate(`#${getApplicantString()}IntendsToSwitchToSole`, undefined, HOW_TO_FINALISE_APPLICATION);
});
Given('I click submit to apply for final order as a sole applicant', async () => {
  await iSubmitToApplyForFinalOrderAsSoleApplicant();
});
Given('I click submit to apply for final order as a sole applicant when overdue', async () => {
  await iSubmitToApplyForFinalOrderAsSoleApplicant(true);
});

Given('I enter the reason for the delay', () => {
  iEnterValueIntoInput('Example reason for the delay', `#${getApplicantString()}FinalOrderLateExplanation`);
});

When('I click confirm and expect hub element {string}', async (expectedElementSelector: string) => {
  await iClickSubmitAndExpectUrl(HUB_PAGE, undefined, undefined, expectedElementSelector);
});
