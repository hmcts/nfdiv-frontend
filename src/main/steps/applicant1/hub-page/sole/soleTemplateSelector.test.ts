import dayjs from 'dayjs';

import { Checkbox } from '../../../../app/case/case';
import {
  AlternativeServiceOutcome,
  DivorceOrDissolution,
  ListValue,
  State,
  YesOrNo,
} from '../../../../app/case/definition';
import { HubTemplate } from '../../../common/hubTemplates';
import { currentStateFn } from '../../../state-sequence';

import { getSoleHubTemplate } from './soleTemplateSelector';

describe('SoleTemplateSelector test', () => {
  const userCase = {
    id: '123',
    state: State.Draft,
    coIsAdminClarificationSubmitted: YesOrNo.NO,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
  };
  const displayState = currentStateFn(userCase.state);

  test('should show /final-order-requested.njk for state FinalOrderRequested', () => {
    const theState = displayState.at(State.FinalOrderRequested);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.FinalOrderRequested);
  });

  test('should show /final-order-requested.njk for state RespondentFinalOrderRequested', () => {
    const theState = displayState.at(State.RespondentFinalOrderRequested);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.FinalOrderRequested);
  });

  test('should show /awaiting-service-consideration-or-awaiting-bailiff-referral.njk for state AwaitingServiceConsideration', () => {
    const theState = displayState.at(State.AwaitingServiceConsideration);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingServiceConsiderationOrAwaitingBailiffReferral);
  });

  test('should show /awaiting-service-consideration-or-awaiting-bailiff-referral.njk for state AwaitingBailiffReferral', () => {
    const theState = displayState.at(State.AwaitingBailiffReferral);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingServiceConsiderationOrAwaitingBailiffReferral);
  });

  test('should show /awaiting-service-consideration-or-awaiting-bailiff-referral.njk for state BailiffRefused', () => {
    const theState = displayState.at(State.BailiffRefused);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingServiceConsiderationOrAwaitingBailiffReferral);
  });

  test('should show /conditional-order-pronounced.njk for state ConditionalOrderPronounced', () => {
    const theState = displayState.at(State.ConditionalOrderPronounced);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.ConditionalOrderPronounced);
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state AwaitingLegalAdvisorReferral', () => {
    const theState = displayState.at(State.AwaitingLegalAdvisorReferral);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingLegalAdvisorReferralOrAwaitingPronouncement);
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state LAReview', () => {
    const theState = displayState.at(State.LAReview);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingLegalAdvisorReferralOrAwaitingPronouncement);
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state AwaitingPronouncement', () => {
    const theState = displayState.at(State.AwaitingPronouncement);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingLegalAdvisorReferralOrAwaitingPronouncement);
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state AwaitingAdminClarification', () => {
    const theState = displayState.at(State.AwaitingAdminClarification);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk');
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state ConditionalOrderReview', () => {
    const theState = displayState.at(State.ConditionalOrderReview);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk');
  });

  test('should show /final-order-requested.njk for state GeneralConsiderationComplete and dateFinalOrderSubmitted', () => {
    const userCaseWithDateFinalOrderSubmitted = {
      ...userCase,
      dateFinalOrderSubmitted: '2024-06-27T14:13:41.478',
    };
    const theState = displayState.at(State.GeneralConsiderationComplete);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithDateFinalOrderSubmitted, false, false);
    expect(soleTemplate).toBe(HubTemplate.FinalOrderRequested);
  });
  test('should show /conditional-order-pronounced.njk for state AwaitingGeneralConsideration and coGrantedDate', () => {
    const userCaseWithCoGrantedDate = {
      ...userCase,
      coGrantedDate: '2024-01-27',
    };
    const theState = displayState.at(State.GeneralConsiderationComplete);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithCoGrantedDate, false, false);
    expect(soleTemplate).toBe(HubTemplate.ConditionalOrderPronounced);
  });
  test('should show /awaiting-conditional-order.njk for state GeneralConsiderationComplete and coApplicant1SubmittedDate', () => {
    const userCaseWithApplicantSubmittedDate = {
      ...userCase,
      coApplicant1SubmittedDate: '2024-01-27',
    };
    const theState = displayState.at(State.GeneralConsiderationComplete);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithApplicantSubmittedDate, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingConditionalOrder);
  });
  test('should show /awaiting-conditional-order.njk for state GeneralConsiderationComplete and coApplicant2SubmittedDate', () => {
    const userCaseWithApplicantSubmittedDate = {
      ...userCase,
      coApplicant2SubmittedDate: '2024-01-27',
    };
    const theState = displayState.at(State.GeneralConsiderationComplete);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithApplicantSubmittedDate, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingConditionalOrder);
  });
  test('should show /awaiting-general-consideration.njk for state GeneralConsiderationComplete and aosStatementOfTruth and no dueDate', () => {
    const userCaseWithApplicantSubmittedDate = {
      ...userCase,
      aosStatementOfTruth: Checkbox.Checked,
    };
    const theState = displayState.at(State.GeneralConsiderationComplete);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithApplicantSubmittedDate, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingGeneralConsideration);
  });
  test('should show /aos-due.njk for state GeneralConsiderationComplete and isAosOverdue', () => {
    const userCaseWithAosOverdue = {
      ...userCase,
      issueDate: '01.01.2022',
    };
    const theState = displayState.at(State.GeneralConsiderationComplete);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithAosOverdue, false, false);
    expect(soleTemplate).toBe(HubTemplate.AoSDue);
  });
  test('should show /aos-awaiting-or-drafted.njk for state GeneralConsiderationComplete and not isAosOverdue', () => {
    const userCaseWithNotAosOverdue = {
      ...userCase,
      issueDate: dayjs().format('D MMMM YYYY'),
    };
    const theState = displayState.at(State.GeneralConsiderationComplete);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithNotAosOverdue, false, false);
    expect(soleTemplate).toBe(HubTemplate.AosAwaitingOrDrafted);
  });

  test('should show /final-order-requested.njk for state AwaitingGeneralConsideration and dateFinalOrderSubmitted', () => {
    const userCaseWithDateFinalOrderSubmitted = {
      ...userCase,
      dateFinalOrderSubmitted: '2024-06-27T14:13:41.478',
    };
    const theState = displayState.at(State.AwaitingGeneralConsideration);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithDateFinalOrderSubmitted, false, false);
    expect(soleTemplate).toBe(HubTemplate.FinalOrderRequested);
  });
  test('should show /awaiting-general-consideration.njk for state AwaitingGeneralConsideration and aosStatementOfTruth', () => {
    const userCaseWithAosStatementOfTruth = {
      ...userCase,
      aosStatementOfTruth: Checkbox.Checked,
    };
    const theState = displayState.at(State.AwaitingGeneralConsideration);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithAosStatementOfTruth, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingGeneralConsideration);
  });
  test('should show /aos-due.njk for state AwaitingGeneralConsideration and isAosOverdue', () => {
    const userCaseWithAosOverdue = {
      ...userCase,
      issueDate: '01.01.2022',
    };
    const theState = displayState.at(State.AwaitingGeneralConsideration);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithAosOverdue, false, false);
    expect(soleTemplate).toBe(HubTemplate.AoSDue);
  });

  test('should show /aos-awaiting-or-drafted.njk for state AwaitingGeneralConsideration and not isAosOverdue', () => {
    const userCaseWithNotAosOverdue = {
      ...userCase,
      issueDate: dayjs().format('D MMMM YYYY'),
    };
    const theState = displayState.at(State.AwaitingGeneralConsideration);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithNotAosOverdue, false, false);
    expect(soleTemplate).toBe(HubTemplate.AosAwaitingOrDrafted);
  });

  test('should show /awaiting-conditional-order.njk for state AwaitingConditionalOrder', () => {
    const theState = displayState.at(State.AwaitingConditionalOrder);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingConditionalOrder);
  });

  test('should show /holding.njk for state Holding', () => {
    const theState = displayState.at(State.Holding);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.Holding);
  });

  test('should show /awaiting-clarification.njk for state AwaitingClarification', () => {
    const theState = displayState.at(State.AwaitingClarification);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingClarification);
  });

  test('should show /clarification-submitted.njk for state ClarificationSubmitted', () => {
    const theState = displayState.at(State.ClarificationSubmitted);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/clarification-submitted.njk');
  });

  test('should show /awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk for state ClarificationSubmitted when coIsAdminClarificationSubmitted is Yes', () => {
    const theState = displayState.at(State.ClarificationSubmitted);
    userCase.coIsAdminClarificationSubmitted = YesOrNo.YES;
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe('/awaiting-legal-advisor-referral-or-awaiting-pronouncement.njk');
  });

  test('should show /awaiting-amended-application.njk for state AwaitingAmendedApplication', () => {
    const theState = displayState.at(State.AwaitingAmendedApplication);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingAmendedApplication);
  });

  test('should show /awaiting-bailiff-service.njk for state AwaitingBailiffService', () => {
    const theState = displayState.at(State.AwaitingBailiffService);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingBailiffService);
  });

  test('should show /awaiting-final-order-or-final-order-overdue.njk for state AwaitingFinalOrder', () => {
    const theState = displayState.at(State.AwaitingFinalOrder);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingFinalOrderOrFinalOrderOverdue);
  });

  test('should show /final-order-complete.njk for state FinalOrderComplete', () => {
    const theState = displayState.at(State.FinalOrderComplete);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.FinalOrderComplete);
  });

  test('should show /awaiting-bailiff-service.njk when FinalOrder is overdue', () => {
    const theState = displayState.at(State.AwaitingFinalOrder);
    const data = { ...userCase, isFinalOrderOverdue: YesOrNo.YES };
    const soleTemplate = getSoleHubTemplate(theState, data, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingFinalOrderOrFinalOrderOverdue);
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
    expect(soleTemplate).toBe(HubTemplate.BailiffServiceUnsuccessful);
  });

  test('should show /service-application-rejected.njk for state AwaitingAos and isAlternativeService and not isServiceApplicationGranted', () => {
    const userCaseWithServiceApplicationNotGranted = {
      ...userCase,
      alternativeServiceOutcomes: [
        {
          id: '123',
          value: {
            serviceApplicationGranted: YesOrNo.NO,
          },
        },
      ] as unknown as ListValue<AlternativeServiceOutcome>[],
    };
    const theState = displayState.at(State.AwaitingAos);
    const soleTemplate = getSoleHubTemplate(theState, userCaseWithServiceApplicationNotGranted, false, true);
    expect(soleTemplate).toBe(HubTemplate.ServiceApplicationRejected);
  });

  test('should show /aos-awaiting-or-drafted.njk for state AwaitingAos', () => {
    const theState = displayState.at(State.AwaitingAos);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AosAwaitingOrDrafted);
  });

  test('should show /aos-due.njk for states after AosDrafted and before Holding', () => {
    const theState = displayState.at(State.AosOverdue);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AoSDue);
  });

  test('should show /aos-awaiting-or-drafted.njk', () => {
    const theState = displayState.at(State.NewPaperCase);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AosAwaitingOrDrafted);
  });

  test('should show /awaiting-service-consideration-or-awaiting-bailiff-referral.njk for state ServiceAdminRefusal', () => {
    const theState = displayState.at(State.ServiceAdminRefusal);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.AwaitingServiceConsiderationOrAwaitingBailiffReferral);
  });

  test('should show /service-application-rejected.njk for state ServiceAdminRefusal and reason is "refusal order to applicant"', () => {
    const userCaseWithServiceApplicationRefusedWithRefusalToApplicant = {
      ...userCase,
      alternativeServiceOutcomes: [
        {
          id: '123',
          value: {
            serviceApplicationGranted: YesOrNo.NO,
            refusalReason: 'refusalOrderToApplicant',
          },
        },
      ] as unknown as ListValue<AlternativeServiceOutcome>[],
    };
    const theState = displayState.at(State.ServiceAdminRefusal);
    const soleTemplate = getSoleHubTemplate(
      theState,
      userCaseWithServiceApplicationRefusedWithRefusalToApplicant,
      false,
      true
    );
    expect(soleTemplate).toBe(HubTemplate.ServiceApplicationRejected);
  });

  test('should show /pending-hearing-outcome.njk for state PendingHearingOutcome', () => {
    const theState = displayState.at(State.PendingHearingOutcome);
    const soleTemplate = getSoleHubTemplate(theState, userCase, false, false);
    expect(soleTemplate).toBe(HubTemplate.PendingHearingOutcome);
  });
});
