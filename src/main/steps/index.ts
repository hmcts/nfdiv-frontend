import * as fs from 'fs';

import { Case, CaseWithId } from '../app/case/case';
import { AppRequest } from '../app/controller/AppRequest';
import { TranslationFn } from '../app/controller/GetController';
import { Form, FormContent } from '../app/form/Form';

import { Step, applicant1Sequence } from './applicant1Sequence';
import { applicant2Sequence } from './applicant2Sequence';
import { CHECK_ANSWERS_URL } from './urls';

const stepForms: Record<string, Form> = {};

[applicant1Sequence, applicant2Sequence].forEach((sequence: Step[], i: number) => {
  const dir = __dirname + (i === 0 ? '/applicant1' : '');
  for (const step of sequence) {
    const stepContentFile = `${dir}${step.url}/content.ts`;
    if (fs.existsSync(stepContentFile)) {
      const content = require(stepContentFile);

      if (content.form) {
        stepForms[step.url] = new Form(content.form);
      }
    }
  }
});

const getNextIncompleteStep = (
  data: CaseWithId,
  step: Step,
  sequence: Step[],
  removeExcluded = false,
  isApplicant2: boolean,
  checkedSteps: Step[] = []
): string => {
  const stepForm = stepForms[step.url];
  // if this step has a form
  if (stepForm !== undefined) {
    // and that form has errors
    const stepExcluded = removeExcluded && step.excludeFromContinueApplication;
    if (!stepExcluded && (!stepForm.isComplete(data) || stepForm.getErrors(data).length > 0)) {
      // go to that step
      return stepExcluded && checkedSteps.length ? checkedSteps[checkedSteps.length - 1].url : step.url;
    } else {
      // if there are no errors go to the next page and work out what to do
      const nextStepUrl = step.getNextStep(data);
      const nextStep = sequence.find(s => s.url === nextStepUrl);

      return nextStep
        ? getNextIncompleteStep(data, nextStep, sequence, removeExcluded, isApplicant2, checkedSteps.concat(step))
        : (isApplicant2 ? '/applicant2' : '') + CHECK_ANSWERS_URL;
    }
  }

  // if the page has no form then ask it where to go
  return step.getNextStep(data);
};

export const getNextIncompleteStepUrl = (req: AppRequest): string => {
  const { queryString } = getPathAndQueryString(req);
  const sequence = getUserSequence(req);
  const url = getNextIncompleteStep(req.session.userCase, sequence[0], sequence, true, req.session.isApplicant2);

  return `${url}${queryString}`;
};

export const getNextStepUrl = (req: AppRequest, data: Partial<Case>): string => {
  const { path, queryString } = getPathAndQueryString(req);
  const nextStep = [...applicant1Sequence, ...applicant2Sequence].find(s => s.url === path);
  const url = nextStep ? nextStep.getNextStep(data) : CHECK_ANSWERS_URL;

  return `${url}${queryString}`;
};

const getUserSequence = (req: AppRequest) => (req.session.isApplicant2 ? applicant2Sequence : applicant1Sequence);

const getPathAndQueryString = (req: AppRequest): { path: string; queryString: string } => {
  const [path, searchParams] = req.originalUrl.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';
  return { path, queryString };
};

const getStepFiles = (stepDir: string) => {
  const stepContentFile = `${stepDir}/content.ts`;
  const content = fs.existsSync(stepContentFile) ? require(stepContentFile) : {};
  const stepViewFile = `${stepDir}/template.njk`;
  const view = fs.existsSync(stepViewFile) ? stepViewFile : `${stepDir}/../../common/template.njk`;

  return { content, view };
};

export type StepWithContent = ({
  stepDir: string;
  generateContent: TranslationFn;
  form: FormContent;
  view: string;
} & Step)[];
const getStepsWithContent = (applicant: number): StepWithContent => {
  const sequence = applicant === 1 ? applicant1Sequence : applicant2Sequence;
  const dir = __dirname + (applicant === 1 ? '/applicant1' : '');

  const results: StepWithContent = [];
  for (const step of sequence) {
    const stepDir = `${dir}${step.url}`;
    const { content, view } = getStepFiles(stepDir);
    results.push({ stepDir, ...step, ...content, view });
  }

  return results;
};

export const stepsWithContentApplicant1 = getStepsWithContent(1);
export const stepsWithContentApplicant2 = getStepsWithContent(2);
export const stepsWithContent = [...stepsWithContentApplicant1, ...stepsWithContentApplicant2];
