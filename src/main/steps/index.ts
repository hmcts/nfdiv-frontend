import * as fs from 'fs';

import { Case, CaseWithId } from '../app/case/case';
import { AppRequest } from '../app/controller/AppRequest';
import { TranslationFn } from '../app/controller/GetController';
import { Form, FormContent } from '../app/form/Form';

import { Step, applicant1Sequence } from './applicant1Sequence';
import { applicant2Sequence } from './applicant2Sequence';
import { CHECK_ANSWERS_URL } from './urls';

const stepForms: Record<string, Form> = {};

for (const step of [...applicant1Sequence, ...applicant2Sequence]) {
  const stepContentFile = `${__dirname}${step.url}/content.ts`;
  if (fs.existsSync(stepContentFile)) {
    const content = require(stepContentFile);

    if (content.form) {
      stepForms[step.url] = new Form(content.form);
    }
  }
}

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
  const url = getNextIncompleteStep(req.session.userCase, sequence[0], sequence, true);

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

export type StepWithContent = ({ generateContent: TranslationFn; form: FormContent } & Step)[];
export const stepsWithContent = ((): StepWithContent => {
  const results: StepWithContent = [];
  for (const step of [...applicant1Sequence, ...applicant2Sequence]) {
    const stepContentFile = `${__dirname}${step.url}/content.ts`;
    const content = fs.existsSync(stepContentFile) ? require(stepContentFile) : {};
    results.push({ ...step, ...content });
  }
  return results;
})();
