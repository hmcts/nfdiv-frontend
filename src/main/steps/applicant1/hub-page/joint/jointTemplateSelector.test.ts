import { DivorceOrDissolution, HubTemplate, State } from '../../../../app/case/definition';
import { currentStateFn } from '../../../state-sequence';

import { getJointHubTemplate } from './jointTemplateSelector';

describe('JointTemplateSelector test', () => {
  const userCase = {
    id: '123',
    state: State.Draft,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
  };
  const displayState = currentStateFn(userCase.state);

  test('should show /awaiting-pronouncement.njk for state AwaitingPronouncement', () => {
    const theState = displayState.at(State.AwaitingPronouncement);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe(HubTemplate.AwaitingPronouncement);
  });

  test('should show /holding.njk for state Holding', () => {
    const theState = displayState.at(State.Holding);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe(HubTemplate.Holding);
  });

  test('should show /conditional-order-pronounced.njk for state ConditionalOrderPronounced', () => {
    const theState = displayState.at(State.ConditionalOrderPronounced);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe(HubTemplate.ConditionalOrderPronounced);
  });

  test('should show /awaiting-clarification.njk for state AwaitingClarification', () => {
    const theState = displayState.at(State.AwaitingClarification);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe(HubTemplate.AwaitingClarification);
  });

  test('should show /awaiting-amended-application.njk for state AwaitingAmendedApplication', () => {
    const theState = displayState.at(State.AwaitingAmendedApplication);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe(HubTemplate.AwaitingAmendedApplication);
  });

  test('should show /clarification-submitted.njk for state ClarificationSubmitted', () => {
    const theState = displayState.at(State.ClarificationSubmitted);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe(HubTemplate.ClarificationSubmitted);
  });

  test('should show /conditional-order-pending.njk for state ConditionalOrderPending', () => {
    const theState = displayState.at(State.ConditionalOrderPending);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe(HubTemplate.ConditionalOrderPending);
  });

  test('should show /awaiting-legal-advisor-referral.njk for state AwaitingLegalAdvisorReferral', () => {
    const theState = displayState.at(State.AwaitingLegalAdvisorReferral);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe(HubTemplate.AwaitingLegalAdvisorReferral);
  });

  test('should show /applicant-not-yet-applied-for-conditional-order.njk for states after Holding and before AwaitingLegalAdvisorReferral and not hasApplicantAppliedForConditionalOrder', () => {
    const theState = displayState.at(State.AwaitingConditionalOrder);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe(HubTemplate.ApplicantNotYetAppliedForConditionalOrder);
  });

  test('should show /final-order-requested.njk for state FinalOrderRequested', () => {
    const theState = displayState.at(State.FinalOrderRequested);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe(HubTemplate.FinalOrderRequested);
  });

  test('should show /awaiting-final-order.njk for state AwaitingFinalOrder', () => {
    const theState = displayState.at(State.AwaitingFinalOrder);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe('/awaiting-final-order.njk');
  });

  test('should show /awaiting-joint-final-order.njk for state AwaitingJointFinalOrder', () => {
    const theState = displayState.at(State.AwaitingJointFinalOrder);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe(HubTemplate.AwaitingJointFinalOrder);
  });

  test('should show /awaiting-final-order.njk for state FinalOrderOverdue', () => {
    const theState = displayState.at(State.FinalOrderOverdue);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe(HubTemplate.AwaitingFinalOrder);
  });

  test('should show /final-order-complete.njk for state FinalOrderComplete', () => {
    const theState = displayState.at(State.FinalOrderComplete);
    const jointTemplate = getJointHubTemplate(theState, false);
    expect(jointTemplate).toBe(HubTemplate.FinalOrderComplete);
  });
});
