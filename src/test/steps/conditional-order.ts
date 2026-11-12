import { State } from '../../main/app/case/definition';
import { HUB_PAGE } from '../../main/steps/urls';

import { TestUserKey } from './commonHelpers/IdamUserManager';
import { iSetTheCaseStateAndSignInAsUser } from './commonHelpers/caseInteraction';
import { iClickToNavigate } from './commonHelpers/navigation';

Given('I progress the case to AwaitingConditionalOrder', async () => {
  await iSetTheCaseStateAndSignInAsUser(State.AwaitingConditionalOrder, TestUserKey.APPLICANT_1, HUB_PAGE);
});
When('I click apply for conditional order', async () => {
  await iClickToNavigate('#applyForConditionalOrderButton');
});
When('I click apply for conditional order and expect URL {string}', async (url: string) => {
  await iClickToNavigate('#applyForConditionalOrderButton', undefined, url);
});
