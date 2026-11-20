import { State } from '../../main/app/case/definition';
import { HUB_PAGE } from '../../main/steps/urls';

import {
  caseworkerUpdatesCourtCaseHearing,
  iSetTheCaseStateAndReSignIn,
  iSetTheCaseStateAndSignInAsUser,
  iUpdateTheCase,
} from './commonHelpers/case-interaction';
import { getCurrentUserKey, getUserKeyByIndex, iLoginAsUser } from './commonHelpers/user-interaction';

export const progressCaseToAwaitingPronouncement = async (expectedElementSelector?: string): Promise<void> => {
  const currentUserKey = getCurrentUserKey();
  await iUpdateTheCase({ state: State.AwaitingPronouncement });
  await caseworkerUpdatesCourtCaseHearing();
  await iLoginAsUser(currentUserKey, HUB_PAGE, expectedElementSelector);
};

Given(
  'I set the case state to {string} and expect hub element {string}',
  async (state: string, expectedElementSelector: string) => {
    await iSetTheCaseStateAndReSignIn(state as State, HUB_PAGE, expectedElementSelector);
  }
);
Given(
  'I set the case state to {string} then login as applicant {string} and expect hub element {string}',
  async (state: string, applicant: string, expectedElementSelector: string) => {
    const userKey = getUserKeyByIndex(parseInt(applicant));
    await iSetTheCaseStateAndSignInAsUser(state as State, userKey, HUB_PAGE, expectedElementSelector);
  }
);
Given(
  'I progress the case to awaiting pronouncement and expect hub element {string}',
  async (expectedElementSelector: string) => {
    await progressCaseToAwaitingPronouncement(expectedElementSelector);
  }
);
