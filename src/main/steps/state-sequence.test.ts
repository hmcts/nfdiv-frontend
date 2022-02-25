import { State } from '../app/case/definition';

import { StateSequence } from './state-sequence';

describe('StateSequence', () => {
  const states = new StateSequence([
    State.Holding,
    State.AwaitingConditionalOrder,
    State.ConditionalOrderDrafted,
    State.ConditionalOrderPending,
    State.AwaitingLegalAdvisorReferral,
    State.AwaitingPronouncement,
    State.ConditionalOrderPronounced,
    State.AwaitingFinalOrder,
    State.FinalOrderRequested,
    State.FinalOrderComplete,
  ]);

  test('Should ensure state is before test state', () => {
    expect(states.at(State.ConditionalOrderPending).isBefore('AwaitingLegalAdvisorReferral')).toBeTruthy();
  });

  test('Should ensure state is after test state', () => {
    expect(states.at(State.AwaitingPronouncement).isAfter('ConditionalOrderDrafted')).toBeTruthy();
  });

  test('Should ensure state is between test states', () => {
    expect(states.at(State.AwaitingPronouncement).isAtOrAfter('AwaitingPronouncement')).toBeTruthy();
  });
});
