import { State } from '../../main/app/case/definition';
import { HUB_PAGE } from '../../main/steps/urls';

import { iSetTheCaseStateAndSignInAsUser } from './commonHelpers/case-interaction';
import { iEnterValueIntoInput } from './commonHelpers/element-interaction';
import { TestUserKey } from './commonHelpers/idam-user-manager';
import { iClickToNavigate } from './commonHelpers/navigation';
import { getUserKeyByIndex } from './commonHelpers/user-interaction';

const APPLY_FOR_CONDITIONAL_ORDER_BUTTON_SELECTOR = '#applyForConditionalOrderButton';
const EXAMPLE_ADDITIONAL_DETAILS = 'Example additional details';
const CO_CLARIFICATION_RESPONSES_SELECTOR = '#coClarificationResponses';

Given('I progress the case to AwaitingConditionalOrder and login as applicant {string}', async (applicant: string) => {
  const userKey = getUserKeyByIndex(parseInt(applicant));
  await iSetTheCaseStateAndSignInAsUser(State.AwaitingConditionalOrder, userKey, HUB_PAGE);
});
Given('I progress the case to AwaitingConditionalOrder and sign in as the respondent', async () => {
  await iSetTheCaseStateAndSignInAsUser(State.AwaitingConditionalOrder, TestUserKey.RESPONDENT, HUB_PAGE);
});
When('I click apply for conditional order', async () => {
  await iClickToNavigate(APPLY_FOR_CONDITIONAL_ORDER_BUTTON_SELECTOR);
});
When('I click apply for conditional order and expect URL {string}', async (url: string) => {
  await iClickToNavigate(APPLY_FOR_CONDITIONAL_ORDER_BUTTON_SELECTOR, undefined, url);
});
When('I provide additional details', () => {
  iEnterValueIntoInput(EXAMPLE_ADDITIONAL_DETAILS, CO_CLARIFICATION_RESPONSES_SELECTOR);
});
