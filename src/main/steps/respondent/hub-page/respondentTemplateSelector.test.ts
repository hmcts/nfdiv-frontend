import { Checkbox } from '../../../app/case/case';
import { DivorceOrDissolution, State } from '../../../app/case/definition';
import { currentStateFn } from '../../state-sequence';

import { getRespondentHubTemplate } from './respondentTemplateSelector';

describe('RespondentTemplateSelector test', () => {
  const userCase = {
    id: '123',
    state: State.Draft,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
  };
  const displayState = currentStateFn(userCase);

  test('should show /final-order-requested.njk for state FinalOrderRequested', () => {
    const theState = displayState.at(State.FinalOrderRequested);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe('/final-order-requested.njk');
  });

  test('should show /awaiting-final-order-or-final-order-overdue.njk for state AwaitingFinalOrder', () => {
    const theState = displayState.at(State.AwaitingFinalOrder);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe('/awaiting-final-order-or-final-order-overdue.njk');
  });

  test('should show /awaiting-final-order-or-final-order-overdue.njk for state FinalOrderOverdue', () => {
    const theState = displayState.at(State.FinalOrderOverdue);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe('/awaiting-final-order-or-final-order-overdue.njk');
  });

  test('should show /conditional-order-pronounced.njk for state ConditionalOrderPronounced', () => {
    const theState = displayState.at(State.ConditionalOrderPronounced);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe('/conditional-order-pronounced.njk');
  });

  test('should show /clarification-submitted.njk for state ClarificationSubmitted', () => {
    const theState = displayState.at(State.ClarificationSubmitted);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe('/clarification-submitted.njk');
  });

  test('should show /awaiting-amended-application.njk for state AwaitingAmendedApplication', () => {
    const theState = displayState.at(State.AwaitingAmendedApplication);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe('/awaiting-amended-application.njk');
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state AwaitingLegalAdvisorReferral', () => {
    const theState = displayState.at(State.AwaitingLegalAdvisorReferral);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe('/awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk');
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state AwaitingPronouncement', () => {
    const theState = displayState.at(State.AwaitingPronouncement);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe('/awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk');
  });

  test('should show /awaiting-general-consideration.njk for state AwaitingGeneralConsideration', () => {
    const userCaseWithAosStatementOfTruth = {
      ...userCase,
      aosStatementOfTruth: Checkbox.Checked,
    };
    const theState = displayState.at(State.AwaitingGeneralConsideration);
    const respondentTemplate = getRespondentHubTemplate(theState, userCaseWithAosStatementOfTruth, false);
    expect(respondentTemplate).toBe('/awaiting-general-consideration.njk');
  });

  test('should show /awaiting-aos.njk for state AwaitingGeneralConsideration if not aosStatementOfTruth', () => {
    const theState = displayState.at(State.AwaitingGeneralConsideration);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe('/awaiting-aos.njk');
  });

  test('should show /holding.njk for state Holding', () => {
    const theState = displayState.at(State.Holding);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe('/holding.njk');
  });

  test('should show /awaiting-aos.njk for states at or before AwaitingConditionalOrder and not hasSubmittedAos', () => {
    const theState = displayState.at(State.AwaitingConditionalOrder);
    const respondentTemplate = getRespondentHubTemplate(theState, userCase, false);
    expect(respondentTemplate).toBe('/awaiting-aos.njk');
  });
});
