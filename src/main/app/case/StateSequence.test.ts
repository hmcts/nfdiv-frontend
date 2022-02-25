import { StateSequence } from './StateSequence';
import { State } from './definition';

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
    expect(states.at(State.ConditionalOrderPending).isBefore('AwaitingLegalAdvisorReferral')).toBeTrue();
  });

  test('Should ensure state is after test state', () => {
    expect(states.at(State.AwaitingPronouncement).isAfter('ConditionalOrderDrafted')).toBeTrue();
  });

  test('Should ensure state is between test states', () => {
    expect(states.at(State.AwaitingPronouncement).isAtOrAfter('AwaitingPronouncement')).toBeTrue();
  });
});
