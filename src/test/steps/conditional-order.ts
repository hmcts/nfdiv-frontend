import { State } from '../../main/app/case/definition';
import { CONTINUE_WITH_YOUR_APPLICATION, HUB_PAGE, READ_THE_RESPONSE } from '../../main/steps/urls';

import { iSetTheCaseStateAndSignInAsUser } from './commonHelpers/case-interaction';
import { iEnterValueIntoInput } from './commonHelpers/element-interaction';
import { iClickToNavigate } from './commonHelpers/navigation';
import { getUserKeyByIndex } from './commonHelpers/user-interaction';

const APPLY_FOR_CONDITIONAL_ORDER_BUTTON_SELECTOR = '#applyForConditionalOrderButton';
const EXAMPLE_ADDITIONAL_DETAILS = 'Example additional details';
const CO_CLARIFICATION_RESPONSES_SELECTOR = '#coClarificationResponses';

Given('I progress the case to AwaitingConditionalOrder and login as applicant {string}', async (applicant: string) => {
  const userKey = getUserKeyByIndex(parseInt(applicant));
  await iSetTheCaseStateAndSignInAsUser(State.AwaitingConditionalOrder, userKey, HUB_PAGE);
});
When('I click apply for conditional order', async () => {
  await iClickToNavigate(APPLY_FOR_CONDITIONAL_ORDER_BUTTON_SELECTOR, undefined, READ_THE_RESPONSE);
});
When('I click to apply for a joint conditional order', async () => {
  await iClickToNavigate(APPLY_FOR_CONDITIONAL_ORDER_BUTTON_SELECTOR, undefined, CONTINUE_WITH_YOUR_APPLICATION);
});
When('I provide additional details', () => {
  iEnterValueIntoInput(EXAMPLE_ADDITIONAL_DETAILS, CO_CLARIFICATION_RESPONSES_SELECTOR);
});
