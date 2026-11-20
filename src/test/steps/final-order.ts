import { State } from '../../main/app/case/definition';
import { HOW_TO_FINALISE_APPLICATION, HUB_PAGE, PAY_YOUR_FINAL_ORDER_FEE } from '../../main/steps/urls';

import { caseworkerUpdatesTheCase } from './commonHelpers/caseInteraction';
import {
  iCheckOption,
  iClickSubmit,
  iClickSubmitAndExpectUrl,
  iEnterValueIntoInput,
} from './commonHelpers/elementInteraction';
import { iClickToNavigate, iWaitInUrl } from './commonHelpers/navigation';
import { getApplicantString, getCapitalisedApplicantString, iSignOut } from './commonHelpers/userInteraction';
import { DEFAULT_DATE, dateStringToApi } from './date';
import { iSubmitToApplyForFinalOrderAsSoleApplicant, prepareTheCaseForSwitchToSoleFinalOrder } from './switchToSole';

export const prepareTheCaseForRespondentToApplyForFinalOrder = async (): Promise<void> => {
  await caseworkerUpdatesTheCase({
    state: State.AwaitingFinalOrder,
    dateFinalOrderEligibleToRespondent: dateStringToApi(DEFAULT_DATE),
  });
};

Given(
  'I prepare the case for the respondent to apply for final order',
  prepareTheCaseForRespondentToApplyForFinalOrder
);

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
Given('I explain why I need to apply for the final order', () => {
  iEnterValueIntoInput('Example reason for respondent fo application', `#${getApplicantString()}FinalOrderExplanation`);
});

When('I click confirm and expect hub element {string}', async (expectedElementSelector: string) => {
  await iClickSubmitAndExpectUrl(HUB_PAGE, undefined, undefined, expectedElementSelector);
});

Given('I click pay and submit but do not complete the payment', async () => {
  iWaitInUrl(PAY_YOUR_FINAL_ORDER_FEE);
  await iClickSubmit();
  iSignOut();
});
