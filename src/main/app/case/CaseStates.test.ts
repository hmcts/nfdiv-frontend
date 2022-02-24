import { CaseStates } from './CaseStates';
import { State } from './definition';

describe('CaseStates', () => {
  const states = new CaseStates([
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
    expect(states.get(State.ConditionalOrderPending).isBefore('AwaitingLegalAdvisorReferral')).toBeTrue();
  });

  test('Should ensure state is after test state', () => {
    expect(states.get(State.AwaitingPronouncement).isAfter('ConditionalOrderDrafted')).toBeTrue();
  });

  test('Should ensure state is between test states', () => {
    expect(
      states.get(State.AwaitingPronouncement).isBetween('AwaitingConditionalOrder', 'FinalOrderRequested')
    ).toBeTrue();
  });
});
