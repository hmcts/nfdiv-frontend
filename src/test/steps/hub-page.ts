import { State } from '../../main/app/case/definition';
import { HUB_PAGE } from '../../main/steps/urls';

import { iSetTheCaseStateAndReSignIn } from './commonHelpers/caseInteraction';

Given(
  'I set the case state to {string} and expect hub element {string}',
  async (state: string, expectedElementSelector: string) => {
    await iSetTheCaseStateAndReSignIn(state as State, HUB_PAGE, expectedElementSelector);
  }
);
