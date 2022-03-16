import * as fs from 'fs';
import { extname } from 'path';

import { CaseWithId } from '../app/case/case';
import { ApplicationType, State } from '../app/case/definition';
import { AppRequest } from '../app/controller/AppRequest';
import { TranslationFn } from '../app/controller/GetController';
import { Form, FormContent } from '../app/form/Form';

import {
  Step,
  applicant1PostSubmissionSequence,
  applicant1PreSubmissionSequence,
  applicant1Sequence,
} from './applicant1Sequence';
import {
  applicant2PostSubmissionSequence,
  applicant2PreSubmissionSequence,
  applicant2Sequence,
} from './applicant2Sequence';
import {
  respondentPostSubmissionSequence,
  respondentPreSubmissionSequence,
  respondentSequence,
} from './respondentSequence';
import { currentStateFn } from './state-sequence';
import { CHECK_ANSWERS_URL, READ_THE_RESPONSE } from './urls';

const stepForms: Record<string, Form> = {};
const ext = extname(__filename);

const allSequences = [
  applicant1PreSubmissionSequence,
  applicant1PostSubmissionSequence,
  applicant2PreSubmissionSequence,
  applicant2PostSubmissionSequence,
  respondentPreSubmissionSequence,
  respondentPostSubmissionSequence,
];

allSequences.forEach((sequence: Step[], i: number) => {
  const dir = __dirname + (i === 0 ? '/applicant1' : '');
  for (const step of sequence) {
    const stepContentFile = `${dir}${step.url}/content${ext}`;
    if (fs.existsSync(stepContentFile)) {
      const content = require(stepContentFile);

      if (content.form) {
        stepForms[step.url] = new Form(content.form.fields);
      }
    }
  }
});

const getNextIncompleteStep = (
  data: CaseWithId,
  step: Step,
  sequence: Step[],
  removeExcluded = false,
  checkedSteps: Step[] = []
): string => {
  const stepForm = stepForms[step.url];
  // if this step has a form
  if (stepForm !== undefined) {
    // and that form has errors
    if (!stepForm.isComplete(data) || stepForm.getErrors(data).length > 0) {
      // go to that step
      return removeExcluded && checkedSteps.length && step.excludeFromContinueApplication
        ? checkedSteps[checkedSteps.length - 1].url
        : step.url;
    } else {
      // if there are no errors go to the next page and work out what to do
      const nextStepUrl = step.getNextStep(data);
      const nextStep = sequence.find(s => s.url === nextStepUrl);

      return nextStep
        ? getNextIncompleteStep(data, nextStep, sequence, removeExcluded, checkedSteps.concat(step))
        : CHECK_ANSWERS_URL;
    }
  }

  // if the page has no form then ask it where to go
  return step.getNextStep(data);
};

export const getNextIncompleteStepUrl = (req: AppRequest): string => {
  const { queryString } = getPathAndQueryString(req);
  const sequence = getUserSequence(req);
  const sequenceIndex =
    !req.session.isApplicant2 &&
    [State.ConditionalOrderDrafted, State.ConditionalOrderPending].includes(req.session.userCase.state)
      ? sequence.findIndex(s => s.url.includes(READ_THE_RESPONSE))
      : 0;
  const url = getNextIncompleteStep(req.session.userCase, sequence[sequenceIndex], sequence, true);

  return `${url}${queryString}`;
};

export const getNextStepUrl = (req: AppRequest, data: Partial<CaseWithId>): string => {
  const { path, queryString } = getPathAndQueryString(req);
  const nextStep = allSequences.reduce((list, sequence) => list.concat(...sequence), []).find(s => s.url === path);
  const url = nextStep ? nextStep.getNextStep(data) : CHECK_ANSWERS_URL;

  return `${url}${queryString}`;
};

export const getUserSequence = (req: AppRequest): Step[] => {
  const stateSequence = currentStateFn(req.session.userCase);

  if (req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION && req.session.isApplicant2) {
    return respondentSequence(stateSequence.isBefore(State.Holding));
  } else if (req.session.isApplicant2) {
    return applicant2Sequence(stateSequence.isBefore(State.Holding));
  } else {
    return applicant1Sequence(stateSequence.isBefore(State.Holding));
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
