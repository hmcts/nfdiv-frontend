import { State } from '../app/case/definition';

import { currentStateFn } from './state-sequence';

describe('StateSequence', () => {
  test('Should ensure state is before test state', () => {
    const mockUserCase = { state: State.ConditionalOrderPending };
    expect(currentStateFn(mockUserCase.state).isBefore('AwaitingLegalAdvisorReferral')).toBeTruthy();
  });

  test('Should ensure state is after test state', () => {
    const mockUserCase = { state: State.AwaitingPronouncement };
    expect(currentStateFn(mockUserCase.state).isAfter('ConditionalOrderDrafted')).toBeTruthy();
  });

  test('Should ensure state is at or after test states', () => {
    const mockUserCase = { state: State.AwaitingPronouncement };
    expect(currentStateFn(mockUserCase.state).isAtOrAfter('AwaitingPronouncement')).toBeTruthy();
  });

  test('Should ensure state is at or before test states', () => {
    const mockUserCase = { state: State.AwaitingPronouncement };
    expect(currentStateFn(mockUserCase.state).isAtOrBefore('AwaitingPronouncement')).toBeTruthy();
  });

  test('Should return sequence with index pointing to current state', () => {
    const mockUserCase = { state: State.AwaitingPronouncement };
    expect(currentStateFn(mockUserCase.state).stateIndex).toEqual(
      currentStateFn(mockUserCase.state).states.indexOf(State.AwaitingPronouncement)
    );
  });

  test('Should return current state', () => {
    const mockUserCase = { state: State.AwaitingPronouncement };
    expect(currentStateFn(mockUserCase.state).state()).toEqual(State.AwaitingPronouncement);
  });
});
