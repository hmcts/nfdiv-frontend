import { DivorceOrDissolution, State } from '../../../../app/case/definition';
import { currentStateFn } from '../../../state-sequence';

import { getJointHubTemplate } from './jointTemplateSelector';

describe('SoleTemplateSelector test', () => {
  const userCase = {
    id: '123',
    state: State.Draft,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
  };
  const displayState = currentStateFn(userCase);

  test('should show /awaiting-pronouncement.njk for state AwaitingPronouncement', () => {
    const theState = displayState.at(State.AwaitingPronouncement);
    const soleTemplate = getJointHubTemplate(theState, false);
    expect(soleTemplate).toBe('/awaiting-pronouncement.njk');
  });

  test('should show /holding.njk for state Holding', () => {
    const theState = displayState.at(State.Holding);
    const soleTemplate = getJointHubTemplate(theState, false);
    expect(soleTemplate).toBe('/holding.njk');
  });

  test('should show /conditional-order-pronounced.njk for state ConditionalOrderPronounced', () => {
    const theState = displayState.at(State.ConditionalOrderPronounced);
    const soleTemplate = getJointHubTemplate(theState, false);
    expect(soleTemplate).toBe('/conditional-order-pronounced.njk');
  });

  test('should show /awaiting-clarification.njk for state AwaitingClarification', () => {
    const theState = displayState.at(State.AwaitingClarification);
    const soleTemplate = getJointHubTemplate(theState, false);
    expect(soleTemplate).toBe('/awaiting-clarification.njk');
  });

  test('should show /clarification-submitted.njk for state ClarificationSubmitted', () => {
    const theState = displayState.at(State.ClarificationSubmitted);
    const soleTemplate = getJointHubTemplate(theState, false);
    expect(soleTemplate).toBe('/clarification-submitted.njk');
  });

  test('should show /conditional-order-pending.njk for state ConditionalOrderPending', () => {
    const theState = displayState.at(State.ConditionalOrderPending);
    const soleTemplate = getJointHubTemplate(theState, false);
    expect(soleTemplate).toBe('/conditional-order-pending.njk');
  });

  test('should show /awaiting-legal-advisor-referral.njk for state AwaitingLegalAdvisorReferral', () => {
    const theState = displayState.at(State.AwaitingLegalAdvisorReferral);
    const soleTemplate = getJointHubTemplate(theState, false);
    expect(soleTemplate).toBe('/awaiting-legal-advisor-referral.njk');
  });

  test('should show /applicant-not-yet-applied-for-conditional-order.njk for states after Holding and before AwaitingLegalAdvisorReferral and not hasApplicantAppliedForConditionalOrder', () => {
    const theState = displayState.at(State.Holding);
    const soleTemplate = getJointHubTemplate(theState, false);
    expect(soleTemplate).toBe('/applicant-not-yet-applied-for-conditional-order.njk');
  });
});
