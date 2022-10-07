import { State } from '../app/case/definition';

import { chronologicalStateSequence, currentStateFn, preSubmittedStatePrioritySequence } from './state-sequence';

describe('StateSequence', () => {
  test('Should ensure state is before test state', () => {
    const mockUserCase = { state: State.ConditionalOrderPending };
    expect(currentStateFn(mockUserCase).isBefore('AwaitingLegalAdvisorReferral')).toBeTruthy();
  });

  test('Should ensure state is after test state', () => {
    const mockUserCase = { state: State.AwaitingPronouncement };
    expect(currentStateFn(mockUserCase).isAfter('ConditionalOrderDrafted')).toBeTruthy();
  });

  test('Should ensure state is at or after test states', () => {
    const mockUserCase = { state: State.AwaitingPronouncement };
    expect(currentStateFn(mockUserCase).isAtOrAfter('AwaitingPronouncement')).toBeTruthy();
  });

  test('Should ensure state is at or before test states', () => {
    const mockUserCase = { state: State.AwaitingPronouncement };
    expect(currentStateFn(mockUserCase).isAtOrBefore('AwaitingPronouncement')).toBeTruthy();
  });

  test('Should return sequence with index pointing to current state', () => {
    const mockUserCase = { state: State.AwaitingPronouncement };
    expect(currentStateFn(mockUserCase).stateIndex).toEqual(
      currentStateFn(mockUserCase).states.indexOf(State.AwaitingPronouncement)
    );
  });

  test('Should return current state', () => {
    const mockUserCase = { state: State.AwaitingPronouncement };
    expect(currentStateFn(mockUserCase).state()).toEqual(State.AwaitingPronouncement);
  });

  test('preSubmittedStatePrioritySequence should be appropriate', async () => {
    expect(preSubmittedStatePrioritySequence).toHaveLength(8);
    expect(preSubmittedStatePrioritySequence).not.toContain(State.Submitted);
  });

  test('chronologicalStateSequence should be appropriate', async () => {
    expect(chronologicalStateSequence).toHaveLength(47);
  });
});
