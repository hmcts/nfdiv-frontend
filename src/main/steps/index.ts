import fs from 'fs';

import { AppRequest } from '../app/controller/AppRequest';
import { AnyObject } from '../app/controller/PostController';
import { Form } from '../app/form/Form';

import { Step, SubStep, sequence } from './sequence';

export { Step, SubStep } from './sequence';

export interface StepWithDepth extends Step {
  depth: number;
}

export const getSteps = (steps: StepWithDepth[] = [], start = sequence, depth = 0): StepWithDepth[] => {
  for (const step of start) {
    steps.push({ ...step, depth });
    if (step.subSteps) {
      getSteps(steps, step.subSteps, depth + 1);
    }
  }
  return steps;
};

export const getNextStepUrl = (
  req: AppRequest,
  currSequence: Step[] | SubStep[] = sequence,
  nextSteps: Step[] = []
): string => {
  const { path, queryString } = getPathAndQueryString(req);

  for (const step of [...currSequence].reverse()) {
    if (step.subSteps) {
      const matchingSubstep = step.subSteps.find(subStep => subStep.when(req.body));
      if (matchingSubstep) {
        getNextStepUrl(req, [matchingSubstep], nextSteps);
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
    const matchingSubstep = currStep.subSteps.find(subStep => subStep.when(req.body));
    if (matchingSubstep) {
      nextSteps.push(matchingSubstep);
    }
  }

  let nextStepsProcessed = [...nextSteps].reverse();
  const maxDepth = steps.sort((a, b) => b.depth - a.depth)[0].depth;
  if (currStep?.depth === maxDepth) {
    nextStepsProcessed = nextStepsProcessed.slice(currStep.depth);
  }

  const url = nextSteps.length === 0 ? path : nextStepsProcessed[0].url;
  return `${url}${queryString}`;
};

type State = Record<string, Record<string, string>>;

export const getNextIncompleteStepUrl = (
  req: AppRequest,
  currSequence: Step[] | SubStep[] = sequence,
  currState?: State,
  incompleteSteps: string[] = []
): string => {
  const state = currState || req.session.state;

  if (!state || Object.keys(state).length === 0) {
    return currSequence[0].url;
  }

  for (const step of [...currSequence].reverse()) {
    if (!state[step.id]) {
      incompleteSteps.push(step.url);
      continue;
    }

    if (step.field && state[step.id]?.[step.field] !== undefined) {
      const stepState = state[step.id];

      const stepContentFile = `${__dirname}/sequence/${step.id}/content.ts`;
      if (fs.existsSync(stepContentFile)) {
        const form = new Form(require(stepContentFile).form);
        if (form.getErrors(stepState as AnyObject).length) {
          incompleteSteps.push(step.url);
          continue;
        }
      }

      if (step.subSteps && stepState) {
        const matchingSubstep = step.subSteps.find(subStep => subStep.when(stepState));
        if (matchingSubstep) {
          if (matchingSubstep.isFinalPage) {
            incompleteSteps.push(step.url);
            continue;
          }
          getNextIncompleteStepUrl(req, [matchingSubstep], state as State, incompleteSteps);
        }
      }
    }
  }

  const url = incompleteSteps.length === 0 ? currSequence[0].url : [...incompleteSteps].reverse()[0];
  const { queryString } = getPathAndQueryString(req);
  return `${url}${queryString}`;
};

const getPathAndQueryString = (req: AppRequest): { path: string; queryString: string } => {
  const [path, searchParams] = req.originalUrl.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';
  return { path, queryString };
};
