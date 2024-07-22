import { Checkbox } from '../../../app/case/case';
import { DivorceOrDissolution, State, YesOrNo } from '../../../app/case/definition';
import { HubTemplate } from '../../common/hubTemplates';
import { currentStateFn } from '../../state-sequence';

import { getRespondentHubTemplate } from './respondentTemplateSelector';

describe('RespondentTemplateSelector test', () => {
  const userCase = {
    id: '123',
    state: State.Draft,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
  };
  const displayState = currentStateFn(userCase.state);

  test('should show /final-order-requested.njk for state FinalOrderRequested', () => {
    const theState = displayState.at(State.FinalOrderRequested);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.FinalOrderRequested);
  });

  test('should show /final-order-requested.njk for state RespondentFinalOrderRequested', () => {
    const theState = displayState.at(State.RespondentFinalOrderRequested);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.FinalOrderRequested);
  });

  test('should show /awaiting-final-order-or-final-order-overdue.njk for state AwaitingFinalOrder', () => {
    const theState = displayState.at(State.AwaitingFinalOrder);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.AwaitingFinalOrderOrFinalOrderOverdue);
  });

  test('should show /awaiting-final-order-or-final-order-overdue.njk when FinalOrder is overdue', () => {
    const theState = displayState.at(State.AwaitingFinalOrder);
    const data = { ...userCase, isFinalOrderOverdue: YesOrNo.YES };
    const respondentTemplate = getRespondentHubTemplate(theState, data, false);
    expect(respondentTemplate).toBe(HubTemplate.AwaitingFinalOrderOrFinalOrderOverdue);
  });

  test('should show /conditional-order-pronounced.njk for state ConditionalOrderPronounced', () => {
    const theState = displayState.at(State.ConditionalOrderPronounced);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.ConditionalOrderPronounced);
  });

  test('should show /clarification-submitted.njk for state ClarificationSubmitted', () => {
    const theState = displayState.at(State.ClarificationSubmitted);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.ClarificationSubmitted);
  });

  test('should show /awaiting-amended-application.njk for state AwaitingAmendedApplication', () => {
    const theState = displayState.at(State.AwaitingAmendedApplication);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.AwaitingAmendedApplication);
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state AwaitingLegalAdvisorReferral', () => {
    const theState = displayState.at(State.AwaitingLegalAdvisorReferral);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.AwaitingLegalAdvisorReferralOrAwaitingPronouncement);
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state LAReview', () => {
    const theState = displayState.at(State.LAReview);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.AwaitingLegalAdvisorReferralOrAwaitingPronouncement);
  });

  test('should show /final-order-complete.njk for state FinalOrderComplete', () => {
    const theState = displayState.at(State.FinalOrderComplete);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.FinalOrderComplete);
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state AwaitingPronouncement', () => {
    const theState = displayState.at(State.AwaitingPronouncement);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.AwaitingLegalAdvisorReferralOrAwaitingPronouncement);
  });

  test('should show /awaiting-general-consideration.njk for state AwaitingGeneralConsideration', () => {
    const userCaseWithAosStatementOfTruth = {
      ...userCase,
      aosStatementOfTruth: Checkbox.Checked,
    };
    const theState = displayState.at(State.AwaitingGeneralConsideration);
    const respondentTemplate = getRespondentHubTemplate(theState, userCaseWithAosStatementOfTruth, false);
    expect(respondentTemplate).toBe(HubTemplate.AwaitingGeneralConsideration);
  });

  test('should show /awaiting-aos.njk for state AwaitingGeneralConsideration if not aosStatementOfTruth', () => {
    const theState = displayState.at(State.AwaitingGeneralConsideration);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.AwaitingAoS);
  });

  test('should show /holding.njk for state Holding', () => {
    const theState = displayState.at(State.Holding);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.AwaitingAoS);
  });

  test('should show /awaiting-aos.njk for state Holding but aos has been submitted', () => {
    const theState = displayState.at(State.Holding);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, true);
    expect(respondentTemplate).toBe(HubTemplate.Holding);
  });

  test('should show /awaiting-aos.njk for states at or before AwaitingConditionalOrder and not hasSubmittedAos', () => {
    const theState = displayState.at(State.AwaitingConditionalOrder);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.AwaitingAoS);
  });

  test('should show /pending-hearing-outcome.njk for state PendingHearingOutcome', () => {
    const theState = displayState.at(State.PendingHearingOutcome);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.PendingHearingOutcome);
  });

  test('should show /pending-hearing-outcome.njk for state PendingHearingDate', () => {
    const theState = displayState.at(State.PendingHearingDate);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe(HubTemplate.PendingHearingOutcome);
  });
});
