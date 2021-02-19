import fs from 'fs';

import { Case } from '../app/api/case';
import { AppRequest } from '../app/controller/AppRequest';
import { Form } from '../app/form/Form';

import { Step, SubStep, sequence } from './sequence';
import { PageLink, SUMMARY_URL } from './urls';

export { Step, SubStep } from './sequence';

interface StepWithDepth extends Step {
  depth: number;
}

export const getSteps = (steps: Step[] = [], start = sequence, depth = 0): StepWithDepth[] => {
  for (const step of start) {
    steps.push({ ...step, depth } as StepWithDepth);
    if (step.subSteps) {
      getSteps(steps, step.subSteps, depth + 1);
    }
  }
  return steps as StepWithDepth[];
};

export const getNextStep = (
  path: PageLink,
  data: Partial<Case>,
  currSequence: Step[] | SubStep[] = sequence,
  nextSteps: Step[] = []
): string => {
  for (const step of [...currSequence].reverse()) {
    if (step.subSteps) {
      const matchingSubstep = step.subSteps.find(subStep => subStep.when(data));
      if (matchingSubstep) {
        getNextStep(path, data, [matchingSubstep], nextSteps);
      }
    }

    if (step.url === path) {
      break;
    }

    nextSteps.push(step);
  }

  const steps = getSteps([], currSequence);
  const currStep = steps.find(step => step.url === path);
  if (currStep?.subSteps) {
    const matchingSubstep = currStep.subSteps.find(subStep => subStep.when(data));
    if (matchingSubstep) {
      nextSteps.push(matchingSubstep);
    }
  }

  let nextStepsProcessed = [...nextSteps].reverse();
  const maxDepth = steps.sort((a, b) => b.depth - a.depth)[0].depth;
  if (currStep?.depth === maxDepth) {
    nextStepsProcessed = nextStepsProcessed.slice(currStep.depth);
  }

  return nextSteps.length === 0 ? SUMMARY_URL : nextStepsProcessed[0].url;
};

const stepForms: Record<string, Form> = {};

for (const step of sequence) {
  const stepContentFile = `${__dirname}/sequence${step.url}/content.ts`;
  if (fs.existsSync(stepContentFile)) {
    stepForms[step.url] = new Form(require(stepContentFile).form);
  }
}

const getNextIncompleteStep = (
  data: Case,
  currSequence: Step[] | SubStep[] = sequence,
  incompleteSteps: string[] = []
): string => {
  for (const step of [...currSequence].reverse()) {
    if (stepForms[step.url] !== undefined) {
      if (stepForms[step.url].getErrors(data).length > 0) {
        incompleteSteps.push(step.url);
        continue;
      }
    }

    if (step.subSteps && data) {
      const matchingSubstep = step.subSteps.find(subStep => subStep.when(data));
      if (matchingSubstep) {
        if (matchingSubstep.isFinalPage) {
          incompleteSteps.push(step.url);
          continue;
        }
        getNextIncompleteStep(data, [matchingSubstep], incompleteSteps);
      }
    }
  }

  return incompleteSteps.length === 0 ? SUMMARY_URL : [...incompleteSteps].reverse()[0];
};

export const getNextIncompleteStepUrl = (req: AppRequest): string => {
  const { queryString } = getPathAndQueryString(req);
  const url = getNextIncompleteStep(req.session.userCase, sequence);

  return `${url}${queryString}`;
};

export const getNextStepUrl = (req: AppRequest): string => {
  const { path, queryString } = getPathAndQueryString(req);
  const url = getNextStep(path, req.body) || SUMMARY_URL;

  return `${url}${queryString}`;
};

const getPathAndQueryString = (req: AppRequest): { path: PageLink; queryString: string } => {
  const [path, searchParams] = <[PageLink, string]>req.originalUrl.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';
  return { path, queryString };
};
