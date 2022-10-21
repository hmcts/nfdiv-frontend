import * as fs from 'fs';
import { extname } from 'path';

import { CaseWithId } from '../app/case/case';
import { ApplicationType, State } from '../app/case/definition';
import { AppRequest } from '../app/controller/AppRequest';
import { TranslationFn } from '../app/controller/GetController';
import { Form, FormContent, FormFields, FormFieldsFn } from '../app/form/Form';

import { Step, applicant1PostSubmissionSequence, applicant1PreSubmissionSequence } from './applicant1Sequence';
import { applicant2PostSubmissionSequence, applicant2PreSubmissionSequence } from './applicant2Sequence';
import { hasSubmittedAos } from './index.utils';
import { respondentSequence } from './respondentSequence';
import { currentStateFn } from './state-sequence';
import { getAosSteps } from './url-utils';
import {
  APPLICANT_2,
  APPLICATION_SUBMITTED,
  CHECK_ANSWERS_URL,
  CHECK_JURISDICTION,
  CONFIRM_JOINT_APPLICATION,
  CONTINUE_WITH_YOUR_APPLICATION,
  HABITUALLY_RESIDENT_ENGLAND_WALES,
  HOME_URL,
  JOINT_APPLICATION_SUBMITTED,
  JURISDICTION_DOMICILE,
  JURISDICTION_LAST_TWELVE_MONTHS,
  LIVING_ENGLAND_WALES_SIX_MONTHS,
  READ_THE_RESPONSE,
  RESIDUAL_JURISDICTION,
  RESPONDENT,
  WHERE_YOUR_LIVES_ARE_BASED_URL,
} from './urls';

const stepFields: Record<string, FormFields | FormFieldsFn> = {};
const ext = extname(__filename);

const allSequences = [
  applicant1PreSubmissionSequence,
  applicant1PostSubmissionSequence,
  applicant2PreSubmissionSequence,
  applicant2PostSubmissionSequence,
  respondentSequence,
];

allSequences.forEach((sequence: Step[], i: number) => {
  const dir = __dirname + (i === 0 || i === 1 ? '/applicant1' : '');
  for (const step of sequence) {
    const stepContentFile = `${dir}${step.url}/content${ext}`;
    if (fs.existsSync(stepContentFile)) {
      const content = require(stepContentFile);

      if (content.form) {
        stepFields[step.url] = content.form.fields;
      }
    }
  }
});

const getNextIncompleteStep = (data: CaseWithId, step: Step, sequence: Step[], checkedSteps: Step[] = []): string => {
  const stepField = stepFields[step.url];
  // if this step has a form
  if (stepField) {
    // and that form has errors
    const fields = typeof stepField === 'function' ? stepField(data) : stepField;
    const stepForm = new Form(fields);
    if (!stepForm.isComplete(data) || stepForm.getErrors(data).length > 0) {
      // go to that step
      return step.url;
    } else {
      // if there are no errors go to the next page and work out what to do
      const nextStepUrl = step.getNextStep(data);
      const nextStep = sequence.find(s => s.url === nextStepUrl);

      return nextStep ? getNextIncompleteStep(data, nextStep, sequence, checkedSteps.concat(step)) : CHECK_ANSWERS_URL;
    }
  }

  // if the page has no form then ask it where to go
  return step.getNextStep(data);
};

export const getNextIncompleteStepUrl = (req: AppRequest): string => {
  const { queryString } = getPathAndQueryString(req);
  const sequence = getUserSequence(req);
  const sequenceIndex = [State.ConditionalOrderDrafted, State.ConditionalOrderPending].includes(
    req.session.userCase.state
  )
    ? req.session.isApplicant2
      ? sequence.findIndex(s => s.url.includes(CONTINUE_WITH_YOUR_APPLICATION))
      : sequence.findIndex(s => s.url.includes(READ_THE_RESPONSE))
    : 0;
  const url = getNextIncompleteStep(req.session.userCase, sequence[sequenceIndex], sequence);

  const jurisdictionUrls = [
    WHERE_YOUR_LIVES_ARE_BASED_URL,
    JURISDICTION_DOMICILE,
    JURISDICTION_LAST_TWELVE_MONTHS,
    HABITUALLY_RESIDENT_ENGLAND_WALES,
    LIVING_ENGLAND_WALES_SIX_MONTHS,
    RESIDUAL_JURISDICTION,
  ];

  if (jurisdictionUrls.some(jurisdictionUrl => url.includes(jurisdictionUrl))) {
    return `${CHECK_JURISDICTION}${queryString}`;
  }

  return `${url}${queryString}`;
};

export const isApplicationReadyToSubmit = (nextStepUrl: string): boolean => {
  const finalUrls = [HOME_URL, `${APPLICANT_2 + CONFIRM_JOINT_APPLICATION}`];
  const startsWithUrls = ['/pay', APPLICATION_SUBMITTED, JOINT_APPLICATION_SUBMITTED];

  return (
    nextStepUrl.includes(CHECK_ANSWERS_URL) ||
    finalUrls.some(url => url === nextStepUrl.split('?')[0]) ||
    startsWithUrls.some(url => nextStepUrl.startsWith(url))
  );
};

export const isConditionalOrderReadyToSubmit = (data: Partial<CaseWithId>, isApp2: boolean): boolean => {
  return isApp2
    ? Boolean(data.applicant2ConfirmInformationStillCorrect)
    : Boolean(data.applicant1ConfirmInformationStillCorrect);
};

export const getNextStepUrl = (req: AppRequest, data: Partial<CaseWithId>): string => {
  const { path, queryString } = getPathAndQueryString(req);
  const nextStep = allSequences.reduce((list, sequence) => list.concat(...sequence), []).find(s => s.url === path);
  const nextStepUrl = nextStep ? nextStep.getNextStep(data) : CHECK_ANSWERS_URL;
  const url = [APPLICANT_2 + HOME_URL, RESPONDENT + HOME_URL].includes(nextStepUrl) ? HOME_URL : nextStepUrl;

  return `${url}${queryString}`;
};

export const getUserSequence = (req: AppRequest): Step[] => {
  const stateSequence = currentStateFn(req.session.userCase.state);

  if (hasSubmittedAos(req.session.userCase)) {
    return respondentSequence.filter(step => !getAosSteps().includes(step.url));
  } else if (req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION && req.session.isApplicant2) {
    return respondentSequence;
  } else if (req.session.isApplicant2) {
    return stateSequence.isBefore(State.Applicant2Approved)
      ? applicant2PreSubmissionSequence
      : applicant2PostSubmissionSequence;
  } else {
    return stateSequence.isBefore(State.AwaitingHWFDecision)
      ? applicant1PreSubmissionSequence
      : applicant1PostSubmissionSequence;
  }
};

const getPathAndQueryString = (req: AppRequest): { path: string; queryString: string } => {
  const [path, searchParams] = req.originalUrl.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';
  return { path, queryString };
};

const getStepFiles = (stepDir: string) => {
  const stepContentFile = `${stepDir}/content${ext}`;
  const content = fs.existsSync(stepContentFile) ? require(stepContentFile) : {};
  const stepViewFile = `${stepDir}/template.njk`;
  const view = fs.existsSync(stepViewFile) ? stepViewFile : `${stepDir}/../../common/template.njk`;

  return { content, view };
};

export type StepWithContent = Step & {
  stepDir: string;
  generateContent: TranslationFn;
  form: FormContent;
  view: string;
};

const getStepsWithContent = (sequence: Step[]): StepWithContent[] => {
  const isApplicant1 = [applicant1PreSubmissionSequence, applicant1PostSubmissionSequence].includes(sequence);
  const dir = __dirname + (isApplicant1 ? '/applicant1' : '');

  const results: StepWithContent[] = [];
  for (const step of sequence) {
    const stepDir = `${dir}${step.url}`;
    const { content, view } = getStepFiles(stepDir);
    results.push({ stepDir, ...step, ...content, view });
  }
  return results;
};

export const stepsWithContent: StepWithContent[] = allSequences.reduce<StepWithContent[]>(
  (list, sequence) => list.concat(...getStepsWithContent(sequence)),
  []
);
export const stepsWithContentPreSubmissionApplicant1 = getStepsWithContent(applicant1PreSubmissionSequence);
