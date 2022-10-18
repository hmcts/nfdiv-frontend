import { DivorceOrDissolution, State } from '../../../../app/case/definition';
import { currentStateFn } from '../../../state-sequence';

import { getJointHubTemplate } from './jointTemplateSelector';

describe('JointTemplateSelector test', () => {
  const userCase = {
    id: '123',
    state: State.Draft,
    previousState: State.Draft,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
  };
  const displayState = currentStateFn(userCase.state);

  test('should show /awaiting-pronouncement.njk for state AwaitingPronouncement', () => {
    const theState = displayState.at(State.AwaitingPronouncement);
    const jointTemplate = getJointHubTemplate(theState, userCase, false);
    expect(jointTemplate).toBe('/awaiting-pronouncement.njk');
  });

  test('should show /holding.njk for state Holding', () => {
    const theState = displayState.at(State.Holding);
    const jointTemplate = getJointHubTemplate(theState, userCase, false);
    expect(jointTemplate).toBe('/holding.njk');
  });

  test('should show /conditional-order-pronounced.njk for state ConditionalOrderPronounced', () => {
    const theState = displayState.at(State.ConditionalOrderPronounced);
    const jointTemplate = getJointHubTemplate(theState, userCase, false);
    expect(jointTemplate).toBe('/conditional-order-pronounced.njk');
  });

  test('should show /awaiting-clarification.njk for state AwaitingClarification', () => {
    const theState = displayState.at(State.AwaitingClarification);
    const jointTemplate = getJointHubTemplate(theState, userCase, false);
    expect(jointTemplate).toBe('/awaiting-clarification.njk');
  });

  test('should show /awaiting-amended-application.njk for state AwaitingAmendedApplication', () => {
    const theState = displayState.at(State.AwaitingAmendedApplication);
    const jointTemplate = getJointHubTemplate(theState, userCase, false);
    expect(jointTemplate).toBe('/awaiting-amended-application.njk');
  });

  test('should show /clarification-submitted.njk for state ClarificationSubmitted', () => {
    const theState = displayState.at(State.ClarificationSubmitted);
    const jointTemplate = getJointHubTemplate(theState, userCase, false);
    expect(jointTemplate).toBe('/clarification-submitted.njk');
  });

  test('should show /awaiting-legal-advisor-referral.njk for state ClarificationSubmitted when previousState is AwaitingAdminClarification', () => {
    const theState = displayState.at(State.ClarificationSubmitted);
    userCase.previousState = State.AwaitingAdminClarification;
    const jointTemplate = getJointHubTemplate(theState, userCase, false);
    expect(jointTemplate).toBe('/awaiting-legal-advisor-referral.njk');
  });

  test('should show /conditional-order-pending.njk for state ConditionalOrderPending', () => {
    const theState = displayState.at(State.ConditionalOrderPending);
    const jointTemplate = getJointHubTemplate(theState, userCase, false);
    expect(jointTemplate).toBe('/conditional-order-pending.njk');
  });

  test('should show /awaiting-legal-advisor-referral.njk for state AwaitingLegalAdvisorReferral', () => {
    const theState = displayState.at(State.AwaitingLegalAdvisorReferral);
    const jointTemplate = getJointHubTemplate(theState, userCase, false);
    expect(jointTemplate).toBe('/awaiting-legal-advisor-referral.njk');
  });

  test('should show /awaiting-legal-advisor-referral.njk for state AwaitingAdminClarification', () => {
    const theState = displayState.at(State.AwaitingAdminClarification);
    const jointTemplate = getJointHubTemplate(theState, userCase, false);
    expect(jointTemplate).toBe('/awaiting-legal-advisor-referral.njk');
  });

  test('should show /applicant-not-yet-applied-for-conditional-order.njk for states after Holding and before AwaitingLegalAdvisorReferral and not hasApplicantAppliedForConditionalOrder', () => {
    const theState = displayState.at(State.AwaitingConditionalOrder);
    const jointTemplate = getJointHubTemplate(theState, userCase, false);
    expect(jointTemplate).toBe('/applicant-not-yet-applied-for-conditional-order.njk');
  });

  test('should show /awaiting-final-order.njk for state AwaitingFinalOrder', () => {
    const theState = displayState.at(State.AwaitingFinalOrder);
    const jointTemplate = getJointHubTemplate(theState, userCase, false);
    expect(jointTemplate).toBe('/awaiting-final-order.njk');
  });

  test('should show /awaiting-final-order.njk for state AwaitingJointFinalOrder', () => {
    const theState = displayState.at(State.AwaitingJointFinalOrder);
    const jointTemplate = getJointHubTemplate(theState, userCase, false);
    expect(jointTemplate).toBe('/awaiting-final-order.njk');
  });

  test('should show /awaiting-final-order.njk for state FinalOrderOverdue', () => {
    const theState = displayState.at(State.FinalOrderOverdue);
    const jointTemplate = getJointHubTemplate(theState, userCase, false);
    expect(jointTemplate).toBe('/awaiting-final-order.njk');
  });

  test('should show /final-order-complete.njk for state FinalOrderComplete', () => {
    const theState = displayState.at(State.FinalOrderComplete);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe('/final-order-complete.njk');
  });
});
