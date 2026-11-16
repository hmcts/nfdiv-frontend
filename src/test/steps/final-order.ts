import { State, YesOrNo } from '../../main/app/case/definition';
import { EXPLAIN_THE_DELAY, HOW_TO_FINALISE_APPLICATION, HUB_PAGE } from '../../main/steps/urls';

import { BrowserCase, caseworkerUpdatesTheCase } from './commonHelpers/caseInteraction';
import {
  iCheckOption,
  iClickSubmit,
  iClickSubmitAndExpectUrl,
  iEnterValueIntoInput,
} from './commonHelpers/elementInteraction';
import { iClickToNavigate, iWaitInUrl } from './commonHelpers/navigation';
import {
  getApplicantString,
  getCapitalisedApplicantString,
  getUserKeyByIndex,
  iSignOutAndLoginAsUser,
  isApplicant2,
  switchApplicant1AndApplicant2,
} from './commonHelpers/userInteraction';

export const prepareTheCaseForSwitchToSoleFinalOrder = async (
  applicantIndex: string,
  overdue: boolean = false
): Promise<void> => {
  const userKey = getUserKeyByIndex(parseInt(applicantIndex));
  const caseData: Partial<BrowserCase> = {
    state: State.AwaitingJointFinalOrder,
    dateFinalOrderSubmitted: '2022-09-21T08:08:34.548',
    [`${getApplicantString()}CanIntendToSwitchToSoleFo`]: YesOrNo.YES,
  };
  if (overdue) {
    caseData.isFinalOrderOverdue = YesOrNo.YES;
  }
  await caseworkerUpdatesTheCase(caseData);
  await iSignOutAndLoginAsUser(userKey, HUB_PAGE, '#secondInTimeFinalOrderNotSubmittedContent');
  await iClickToNavigate('#switchToSoleLink', undefined, HOW_TO_FINALISE_APPLICATION);
};

export const iSubmitToApplyForFinalOrderAsSoleApplicant = async (overdue: boolean = false): Promise<void> => {
  await iClickSubmit();
  if (isApplicant2()) {
    switchApplicant1AndApplicant2();
  }
  iWaitInUrl(overdue ? EXPLAIN_THE_DELAY : HUB_PAGE, undefined, overdue ? undefined : '#finalOrderRequestedContent');
};

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

When('I click confirm', iClickSubmit);
When('I click confirm and expect URL {string}', async (url: string) => {
  await iClickSubmitAndExpectUrl(url);
});
When(
  'I click confirm and expect URL {string} with element {string}',
  async (url: string, expectedElementSelector: string) => {
    await iClickSubmitAndExpectUrl(url, undefined, undefined, expectedElementSelector);
  }
);
