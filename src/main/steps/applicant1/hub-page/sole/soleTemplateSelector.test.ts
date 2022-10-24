import dayjs from 'dayjs';

import { Checkbox } from '../../../../app/case/case';
import {
  AlternativeServiceOutcome,
  DivorceOrDissolution,
  ListValue,
  State,
  YesOrNo,
} from '../../../../app/case/definition';
import { currentStateFn } from '../../../state-sequence';

import { getSoleHubTemplate } from './soleTemplateSelector';

describe('SoleTemplateSelector test', () => {
  const userCase = {
    id: '123',
    state: State.Draft,
    isAdminClarificationSubmitted: YesOrNo.NO,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
  };
  const displayState = currentStateFn(userCase.state);

  test('should show /final-order-requested.njk for state FinalOrderRequested', () => {
    const theState = displayState.at(State.FinalOrderRequested);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/final-order-requested.njk');
  });

  test('should show /awaiting-service-consideration-or-awaiting-bailiff-referral.njk for state AwaitingServiceConsideration', () => {
    const theState = displayState.at(State.AwaitingServiceConsideration);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-service-consideration-or-awaiting-bailiff-referral.njk');
  });

  test('should show /awaiting-service-consideration-or-awaiting-bailiff-referral.njk for state AwaitingBailiffReferral', () => {
    const theState = displayState.at(State.AwaitingBailiffReferral);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-service-consideration-or-awaiting-bailiff-referral.njk');
  });

  test('should show /conditional-order-pronounced.njk for state ConditionalOrderPronounced', () => {
    const theState = displayState.at(State.ConditionalOrderPronounced);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/conditional-order-pronounced.njk');
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state AwaitingLegalAdvisorReferral', () => {
    const theState = displayState.at(State.AwaitingLegalAdvisorReferral);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk');
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state AwaitingPronouncement', () => {
    const theState = displayState.at(State.AwaitingPronouncement);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk');
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state AwaitingAdminClarification', () => {
    const theState = displayState.at(State.AwaitingAdminClarification);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk');
  });

  test('should show /awaiting-general-consideration.njk for state AwaitingGeneralConsideration and aosStatementOfTruth', () => {
    const userCaseWithAosStatementOfTruth = {
      ...userCase,
      aosStatementOfTruth: Checkbox.Checked,
    };
    const theState = displayState.at(State.AwaitingGeneralConsideration);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithAosStatementOfTruth, false, false);
    expect(soleTemplate).toBe('/awaiting-general-consideration.njk');
  });
  test('should show /aos-due.njk for state AwaitingGeneralConsideration and isAosOverdue', () => {
    const userCaseWithAosOverdue = {
      ...userCase,
      issueDate: '01.01.2022',
    };
    const theState = displayState.at(State.AwaitingGeneralConsideration);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithAosOverdue, false, false);
    expect(soleTemplate).toBe('/aos-due.njk');
  });

  test('should show /aos-awaiting-or-drafted.njk for state AwaitingGeneralConsideration and not isAosOverdue', () => {
    const userCaseWithNotAosOverdue = {
      ...userCase,
      issueDate: dayjs().format('D MMMM YYYY'),
    };
    const theState = displayState.at(State.AwaitingGeneralConsideration);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithNotAosOverdue, false, false);
    expect(soleTemplate).toBe('/aos-awaiting-or-drafted.njk');
  });

  test('should show /awaiting-conditional-order.njk for state AwaitingConditionalOrder', () => {
    const theState = displayState.at(State.AwaitingConditionalOrder);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-conditional-order.njk');
  });

  test('should show /holding.njk for state Holding', () => {
    const theState = displayState.at(State.Holding);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/holding.njk');
  });

  test('should show /awaiting-clarification.njk for state AwaitingClarification', () => {
    const theState = displayState.at(State.AwaitingClarification);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-clarification.njk');
  });

  test('should show /clarification-submitted.njk for state ClarificationSubmitted', () => {
    const theState = displayState.at(State.ClarificationSubmitted);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/clarification-submitted.njk');
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state ClarificationSubmitted when isAdminClarificationSubmitted is Yes', () => {
    const theState = displayState.at(State.ClarificationSubmitted);
    userCase.isAdminClarificationSubmitted = YesOrNo.YES;
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk');
  });

  test('should show /awaiting-amended-application.njk for state AwaitingAmendedApplication', () => {
    const theState = displayState.at(State.AwaitingAmendedApplication);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-amended-application.njk');
  });

  test('should show /awaiting-bailiff-service.njk for state AwaitingBailiffService', () => {
    const theState = displayState.at(State.AwaitingBailiffService);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-bailiff-service.njk');
  });

  test('should show /awaiting-final-order-or-final-order-overdue.njk for state AwaitingFinalOrder', () => {
    const theState = displayState.at(State.AwaitingFinalOrder);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-final-order-or-final-order-overdue.njk');
  });

  test('should show /final-order-complete.njk for state FinalOrderComplete', () => {
    const theState = displayState.at(State.FinalOrderComplete);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/final-order-complete.njk');
  });

  test('should show /awaiting-bailiff-service.njk for state FinalOrderOverdue', () => {
    const theState = displayState.at(State.FinalOrderOverdue);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-final-order-or-final-order-overdue.njk');
  });

  test('should show /bailiff-service-unsuccessful.njk for state AwaitingAos and isServiceApplicationGranted and not isSuccessfullyServedByBailiff', () => {
    const userCaseWithServiceApplicationGranted = {
      ...userCase,
      alternativeServiceOutcomes: [
        {
          id: '123',
          value: {
            serviceApplicationGranted: YesOrNo.YES,
          },
        },
      ] as unknown as ListValue<AlternativeServiceOutcome>[],
    };
    const theState = displayState.at(State.AwaitingAos);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithServiceApplicationGranted, false, false);
    expect(soleTemplate).toBe('/bailiff-service-unsuccessful.njk');
  });

  test('should show /service-application-rejected.njk for state AwaitingAos and isAlternativeService and not isServiceApplicationGranted', () => {
    const theState = displayState.at(State.AwaitingAos);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, true);
    expect(soleTemplate).toBe('/service-application-rejected.njk');
  });

  test('should show /aos-awaiting-or-drafted.njk for state AwaitingAos', () => {
    const theState = displayState.at(State.AwaitingAos);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/aos-awaiting-or-drafted.njk');
  });

  test('should show /aos-due.njk for states after AosDrafted and before Holding', () => {
    const theState = displayState.at(State.AosOverdue);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/aos-due.njk');
  });

  test('should show /aos-awaiting-or-drafted.njk', () => {
    const theState = displayState.at(State.NewPaperCase);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/aos-awaiting-or-drafted.njk');
  });
});
