import { CcdV1Response } from '../app/case/case-api-client';
import { DivorceOrDissolution, State } from '../app/case/definition';

import {
  currentStateFn,
  getHighestPriorityPreSubmissionCases,
  orderedStateSequence,
  preSubmittedStatePrioritySequence,
} from './state-sequence';

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

  test('preSubmittedStatePrioritySequence should be appropriate', async () => {
    expect(preSubmittedStatePrioritySequence).toHaveLength(8);
    expect(preSubmittedStatePrioritySequence).not.toContain(State.Submitted);
  });

  test('orderedStateSequence should be appropriate', async () => {
    expect(orderedStateSequence).toHaveLength(51);
  });

  describe('getHighestPriorityPreSubmissionCases', () => {
    const divorceOrDissolution = DivorceOrDissolution.DIVORCE;
    test('Throw error if one of the cases is in post-submission state', async () => {
      const userCase1 = { id: '1', state: State.Submitted, case_data: { divorceOrDissolution } } as CcdV1Response;
      expect(() => getHighestPriorityPreSubmissionCases([userCase1])).toThrow(
        new Error('At least one of the userCases is not in a pre-submitted state')
      );
    });

    test('Return the highest priority of two pre-submission cases', async () => {
      const userCase1 = { id: '2', state: State.AwaitingPayment, case_data: { divorceOrDissolution } } as CcdV1Response;
      const userCase2 = { id: '1', state: State.Draft, case_data: { divorceOrDissolution } } as CcdV1Response;
      const priorityCase = getHighestPriorityPreSubmissionCases([userCase1, userCase2]);
      expect(priorityCase).toEqual([userCase1]);
    });

    test('Return both the highest priority cases of three pre-submission cases', async () => {
      const userCase1 = { id: '3', state: State.AwaitingPayment, case_data: { divorceOrDissolution } } as CcdV1Response;
      const userCase2 = { id: '2', state: State.AwaitingPayment, case_data: { divorceOrDissolution } } as CcdV1Response;
      const userCase3 = { id: '1', state: State.Draft, case_data: { divorceOrDissolution } } as CcdV1Response;
      const priorityCase = getHighestPriorityPreSubmissionCases([userCase1, userCase2, userCase3]);
      expect(priorityCase).toEqual([userCase1, userCase2]);
    });
  });
});
