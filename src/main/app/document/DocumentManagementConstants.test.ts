import { userCanUploadDocuments } from './DocumentManagementConstants';
import { ApplicationType, State } from '../case/definition';

describe('userCanUploadDocuments', () => {
  describe('when user is applicant 1', () => {
    const validStates = [
      State.Draft,
      State.AosDrafted,
      State.AosOverdue,
      State.AwaitingApplicant1Response,
      State.AwaitingClarification,
      State.InformationRequested,
      State.AwaitingRequestedInformation,
      State.RequestedInformationSubmitted,
    ];

    test.each(validStates)('should return true for valid state %s', state => {
      const userCase = { state };
      expect(userCanUploadDocuments(userCase, false)).toBe(true);
    });

    it('should return false for an invalid state', () => {
      const userCase = { state: State.ConditionalOrderDrafted };
      expect(userCanUploadDocuments(userCase, false)).toBe(false);
    });
  });

  describe('when user is applicant 2 in a joint application', () => {
    const validStates = [
      State.AwaitingApplicant2Response,
      State.AwaitingClarification,
      State.InformationRequested,
      State.AwaitingRequestedInformation,
      State.RequestedInformationSubmitted,
    ];

    test.each(validStates)('should return true for valid state %s', state => {
      const userCase = { state, applicationType: ApplicationType.JOINT_APPLICATION };
      expect(userCanUploadDocuments(userCase, true)).toBe(true);
    });

    it('should return false for an invalid state', () => {
      const userCase = { state: State.Draft, applicationType: ApplicationType.JOINT_APPLICATION };
      expect(userCanUploadDocuments(userCase, true)).toBe(false);
    });
  });

  describe('when user is the respondent in a sole application', () => {
    const validStates = [
      State.AosDrafted,
      State.AosOverdue,
      State.AwaitingConditionalOrder,
      State.AwaitingServicePayment,
      State.AwaitingGeneralApplicationPayment,
      State.AwaitingGeneralConsideration,
      State.GeneralApplicationReceived,
      State.AwaitingDocuments
    ];

    test.each(validStates)('should return true for valid respondent state %s', state => {
      const userCase = { state, applicationType: ApplicationType.SOLE_APPLICATION };
      expect(userCanUploadDocuments(userCase, true)).toBe(true);
    });

    it('should return false for states after ConditionalOrderDrafted', () => {
      const laterState = State.ConditionalOrderDrafted;
      const userCase = { state: laterState, applicationType: ApplicationType.SOLE_APPLICATION };
      expect(userCanUploadDocuments(userCase, true)).toBe(false);
    });
  });
});