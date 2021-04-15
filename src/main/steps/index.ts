import * as fs from 'fs';

import { Case, CaseWithId } from '../app/case/case';
import { AppRequest } from '../app/controller/AppRequest';
import { TranslationFn } from '../app/controller/GetController';
import { Form, FormContent } from '../app/form/Form';

import { Step, sequence } from './sequence';
import { APPLICATION_SUBMITTED } from './urls';

const stepForms: Record<string, Form> = {};

for (const step of sequence) {
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
        ? getNextIncompleteStep(data, nextStep, removeExcluded, checkedSteps.concat(step))
        : APPLICATION_SUBMITTED;
    }
  }

  // if the page has no form then ask it where to go
  return step.getNextStep(data);
};

export const getNextIncompleteStepUrl = (req: AppRequest): string => {
  const { queryString } = getPathAndQueryString(req);
  const url = getNextIncompleteStep(req.session.userCase, sequence[0], true);

  return `${url}${queryString}`;
};

export const getNextStepUrl = (req: AppRequest, data: Partial<Case>): string => {
  const { path, queryString } = getPathAndQueryString(req);
  const nextStep = sequence.find(s => s.url === path);
  const url = nextStep ? nextStep.getNextStep(data) : APPLICATION_SUBMITTED;

  return `${url}${queryString}`;
};

const getPathAndQueryString = (req: AppRequest): { path: string; queryString: string } => {
  const [path, searchParams] = req.originalUrl.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';
  return { path, queryString };
};

export type StepWithContent = ({ generateContent: TranslationFn; form: FormContent } & Step)[];
export const stepsWithContent = ((): StepWithContent => {
  const results: StepWithContent = [];
  for (const step of sequence) {
    const content = require(`${__dirname}${step.url}/content.ts`);
    results.push({ ...step, ...content });
  }
  return results;
})();
