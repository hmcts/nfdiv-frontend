import { orderedStateSequence } from '../../steps/state-sequence';
import { CaseWithId } from '../case/case';
import { ApplicationType, State } from '../case/definition';

export const UPPY_FILE_INPUT_BUTTON_CLASS = 'uppy-FileInput-btn';
export const UPPY_FILE_INPUT_BUTTON_ID = 'file-upload-btn';

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
  State.AwaitingConditionalOrder,
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
