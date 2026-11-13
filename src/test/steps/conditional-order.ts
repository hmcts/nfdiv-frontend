import { State } from '../../main/app/case/definition';
import { HUB_PAGE } from '../../main/steps/urls';

import { TestUserKey } from './commonHelpers/IdamUserManager';
import { iSetTheCaseStateAndSignInAsUser } from './commonHelpers/caseInteraction';
import { iEnterValueIntoInput } from './commonHelpers/elementInteraction';
import { iClickToNavigate } from './commonHelpers/navigation';
import { getUserKeyByIndex } from './commonHelpers/userInteraction';

Given('I progress the case to AwaitingConditionalOrder and login as applicant {string}', async (applicant: string) => {
  const userKey = getUserKeyByIndex(parseInt(applicant));
  await iSetTheCaseStateAndSignInAsUser(State.AwaitingConditionalOrder, userKey, HUB_PAGE);
});
Given('I progress the case to AwaitingConditionalOrder and sign in as the respondent', async () => {
  await iSetTheCaseStateAndSignInAsUser(State.AwaitingConditionalOrder, TestUserKey.RESPONDENT, HUB_PAGE);
});
Given('I set the case state to {string} and login as applicant {string}', async (state: string, applicant: string) => {
  const userKey = getUserKeyByIndex(parseInt(applicant));
  await iSetTheCaseStateAndSignInAsUser(state as State, userKey, HUB_PAGE);
});
When('I click apply for conditional order', async () => {
  await iClickToNavigate('#applyForConditionalOrderButton');
});
When('I click apply for conditional order and expect URL {string}', async (url: string) => {
  await iClickToNavigate('#applyForConditionalOrderButton', undefined, url);
});
When('I provide additional details', () => {
  iEnterValueIntoInput('test details', '#coClarificationResponses');
});
