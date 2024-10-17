import { DivorceOrDissolution, State, YesOrNo } from '../../../../app/case/definition';
import { HubTemplate } from '../../../common/hubTemplates';
import { currentStateFn } from '../../../state-sequence';

import { getJointHubTemplate } from './jointTemplateSelector';

describe('JointTemplateSelector test', () => {
  const userCase = {
    id: '123',
    state: State.Draft,
    coIsAdminClarificationSubmitted: YesOrNo.NO,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
  };
  const displayState = currentStateFn(userCase.state);

  test('should show /awaiting-pronouncement.njk for state AwaitingPronouncement', () => {
    const theState = displayState.at(State.AwaitingPronouncement);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.AwaitingPronouncement);
  });

  test('should show /holding.njk for state Holding', () => {
    const theState = displayState.at(State.Holding);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.Holding);
  });

  test('should show /conditional-order-pronounced.njk for state ConditionalOrderPronounced', () => {
    const theState = displayState.at(State.ConditionalOrderPronounced);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.ConditionalOrderPronounced);
  });

  test('should show /awaiting-clarification.njk for state AwaitingClarification', () => {
    const theState = displayState.at(State.AwaitingClarification);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.AwaitingClarification);
  });

  test('should show /awaiting-amended-application.njk for state AwaitingAmendedApplication', () => {
    const theState = displayState.at(State.AwaitingAmendedApplication);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.AwaitingAmendedApplication);
  });

  test('should show /clarification-submitted.njk for state ClarificationSubmitted', () => {
    const theState = displayState.at(State.ClarificationSubmitted);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.ClarificationSubmitted);
  });

  test('should show /awaiting-legal-advisor-referral.njk for state ClarificationSubmitted when coIsAdminClarificationSubmitted is Yes', () => {
    const theState = displayState.at(State.ClarificationSubmitted);
    userCase.coIsAdminClarificationSubmitted = YesOrNo.YES;
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.AwaitingLegalAdvisorReferral);
  });

  test('should show /conditional-order-pending.njk for state ConditionalOrderPending', () => {
    const theState = displayState.at(State.ConditionalOrderPending);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.ConditionalOrderPending);
  });

  test('should show /awaiting-legal-advisor-referral.njk for state AwaitingLegalAdvisorReferral', () => {
    const theState = displayState.at(State.AwaitingLegalAdvisorReferral);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.AwaitingLegalAdvisorReferral);
  });

  test('should show /awaiting-legal-advisor-referral.njk for state LAReview', () => {
    const theState = displayState.at(State.LAReview);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.AwaitingLegalAdvisorReferral);
  });

  test('should show /awaiting-legal-advisor-referral.njk for state AwaitingAdminClarification', () => {
    const theState = displayState.at(State.AwaitingAdminClarification);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.AwaitingLegalAdvisorReferral);
  });

  test('should show /awaiting-legal-advisor-referral.njk for state ConditionalOrderReview', () => {
    const theState = displayState.at(State.ConditionalOrderReview);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.AwaitingLegalAdvisorReferral);
  });

  test('should show /applicant-not-yet-applied-for-conditional-order.njk for states after Holding and before AwaitingLegalAdvisorReferral and not hasApplicantAppliedForConditionalOrder', () => {
    const theState = displayState.at(State.AwaitingConditionalOrder);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.ApplicantNotYetAppliedForConditionalOrder);
  });

  test('should show /final-order-requested.njk for state FinalOrderRequested', () => {
    const theState = displayState.at(State.FinalOrderRequested);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.FinalOrderRequested);
  });

  test('should show /final-order-requested.njk for state AwaitingGeneralConsideration', () => {
    const theState = displayState.at(State.AwaitingGeneralConsideration);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.FinalOrderRequested);
  });

  test('should show /awaiting-final-order.njk for state AwaitingFinalOrder', () => {
    const theState = displayState.at(State.AwaitingFinalOrder);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.AwaitingFinalOrder);
  });

  test('should show /awaiting-joint-final-order.njk for state AwaitingJointFinalOrder', () => {
    const theState = displayState.at(State.AwaitingJointFinalOrder);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.AwaitingJointFinalOrder);
  });

  test('should show /intend-to-switch-to-sole-final-order.njk for state AwaitingJointFinalOrder within SwitchToSoleFO Notification Window', () => {
    const theState = displayState.at(State.AwaitingJointFinalOrder);
    const jointTemplate = getJointHubTemplate(theState, userCase, {
      isWithinSwitchToSoleFoIntentionNotificationPeriod: true,
    });
    expect(jointTemplate).toBe(HubTemplate.IntendToSwitchToSoleFinalOrder);
  });

  test('should show /awaiting-final-order.njk for state AwaitingJointFinalOrder when SwitchToSoleFO Notification Window has Expired', () => {
    const theState = displayState.at(State.AwaitingJointFinalOrder);
    const jointTemplate = getJointHubTemplate(theState, userCase, {
      hasSwitchToSoleFoIntentionNotificationPeriodExpired: true,
    });
    expect(jointTemplate).toBe(HubTemplate.AwaitingFinalOrder);
  });

  test('should show /awaiting-final-order.njk when FinalOrder is overdue', () => {
    const theState = displayState.at(State.AwaitingFinalOrder);
    const data = { ...userCase, isFinalOrderOverdue: YesOrNo.YES };
    const jointTemplate = getJointHubTemplate(theState, data);
    expect(jointTemplate).toBe(HubTemplate.AwaitingFinalOrder);
  });

  test('should show /final-order-complete.njk for state FinalOrderComplete', () => {
    const theState = displayState.at(State.FinalOrderComplete);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.FinalOrderComplete);
  });

  test('should show /pending-hearing-outcome.njk for state PendingHearingOutcome', () => {
    const theState = displayState.at(State.PendingHearingOutcome);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.PendingHearingOutcome);
  });

  test('should show /pending-hearing-outcome.njk for state PendingHearingDate', () => {
    const theState = displayState.at(State.PendingHearingDate);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.PendingHearingOutcome);
  });

  test('should show /information-requested.njk for state InformationRequested if request party matches applicant', () => {
    const theState = displayState.at(State.InformationRequested);
    const jointTemplate = getJointHubTemplate(theState, userCase, {
      isApplicantAbleToRespondToRequestForInformation: true,
    });
    expect(jointTemplate).toBe(HubTemplate.InformationRequested);
  });

  test('should show /awaiting-requested-information.njk for state AwaitingRequestedInformation if request party matches applicant', () => {
    const theState = displayState.at(State.AwaitingRequestedInformation);
    const jointTemplate = getJointHubTemplate(theState, userCase, {
      isApplicantAbleToRespondToRequestForInformation: true,
    });
    expect(jointTemplate).toBe(HubTemplate.AwaitingRequestedInformation);
  });

  test('should show /requested-information-submitted.njk for state RequestedInformationSubmitted if request party matches applicant', () => {
    const theState = displayState.at(State.RequestedInformationSubmitted);
    const jointTemplate = getJointHubTemplate(theState, userCase, {
      isApplicantAbleToRespondToRequestForInformation: true,
    });
    expect(jointTemplate).toBe(HubTemplate.RespondedToInformationRequest);
  });

  test('should show /information-requested-from-partner-or-other.njk for state InformationRequested if request party does not match applicant', () => {
    const theState = displayState.at(State.InformationRequested);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.InformationRequestedFromPartnerOrOther);
  });

  test('should show /information-requested-from-partner-or-other.njk for state AwaitingRequestedInformation if request party does not match applicant', () => {
    const theState = displayState.at(State.AwaitingRequestedInformation);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.InformationRequestedFromPartnerOrOther);
  });

  test('should show /information-requested-from-partner-or-other.njk for state RequestedInformationSubmitted if request party does not match applicant', () => {
    const theState = displayState.at(State.RequestedInformationSubmitted);
    const jointTemplate = getJointHubTemplate(theState, userCase);
    expect(jointTemplate).toBe(HubTemplate.InformationRequestedFromPartnerOrOther);
  });
});
