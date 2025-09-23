import { orderedStateSequence } from '../../steps/state-sequence';
import { CaseWithId } from '../case/case';
import { ApplicationType, State } from '../case/definition';

const APPLICANT_ONE_DOC_UPLOAD_STATES = [
  State.Draft,
  State.AosDrafted,
  State.AosOverdue,
  State.AwaitingApplicant1Response,
  State.AwaitingClarification,
  State.InformationRequested,
  State.AwaitingRequestedInformation,
  State.RequestedInformationSubmitted,
];

const APPLICANT_TWO_DOC_UPLOAD_STATES = [
  State.AwaitingApplicant2Response,
  State.AwaitingClarification,
  State.InformationRequested,
  State.AwaitingRequestedInformation,
  State.RequestedInformationSubmitted,
];

const RESPONDENT_DOC_UPLOAD_STATES = orderedStateSequence.slice(
  0,
  orderedStateSequence.indexOf(State.ConditionalOrderDrafted)
);

export const userCanUploadDocuments = (userCase: Partial<CaseWithId>, isApplicant2: boolean): boolean => {
  const isSole = userCase?.applicationType === ApplicationType.SOLE_APPLICATION;
  const state = userCase?.state as State;

  if (isApplicant2) {
    return isSole ? RESPONDENT_DOC_UPLOAD_STATES.includes(state) : APPLICANT_TWO_DOC_UPLOAD_STATES.includes(state);
  } else {
    return APPLICANT_ONE_DOC_UPLOAD_STATES.includes(state);
  }
};
