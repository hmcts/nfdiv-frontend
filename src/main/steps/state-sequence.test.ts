import { State } from '../app/case/definition';

import { currentStateFn } from './state-sequence';

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
});
