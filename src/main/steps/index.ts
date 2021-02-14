import fs from 'fs';

import { AppRequest } from '../app/controller/AppRequest';
import { AnyObject } from '../app/controller/PostController';
import { Form } from '../app/form/Form';

import { Step, SubStep, sequence } from './sequence';

export { Step, SubStep } from './sequence';

export const getSteps = (steps: Step[] = [], start = sequence): Step[] => {
  for (const step of start) {
    steps.push(step);
    if (step.subSteps) {
      getSteps(steps, step.subSteps);
    }
  }
  return steps;
};

export const getNextStepUrl = (req: AppRequest): string => {
  const [path, searchParams] = req.originalUrl.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';

  const currentStep = sequence.find(step => step.url === path);
  if (!currentStep) {
    return '/step-not-found';
  }
  if (currentStep.subSteps?.length) {
    const foundMatchingSubstep = currentStep.subSteps.find(subStep => subStep.when(req.body));
    if (foundMatchingSubstep?.url) {
      return `${foundMatchingSubstep?.url}${queryString}`;
    }
  }
  const index = sequence.indexOf(currentStep);
  return `${sequence[index + 1]?.url || path}${queryString}`;
};

type State = Record<string, Record<string, string>>;

export const getLatestIncompleteStepUrl = (
  req: AppRequest,
  currState?: State,
  currSequence: Step[] | SubStep[] = sequence,
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
          getLatestIncompleteStepUrl(req, state as State, [matchingSubstep], incompleteSteps);
        }
      }
    }
  }

  return incompleteSteps.length === 0 ? currSequence[0].url : [...incompleteSteps].reverse()[0];
};
