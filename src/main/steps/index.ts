import * as fs from 'fs';

import { Case, CaseWithId } from '../app/case/case';
import { AppRequest } from '../app/controller/AppRequest';
import { Form } from '../app/form/Form';

import { Step, sequence } from './sequence';
import { CHECK_ANSWERS_URL } from './urls';

const stepForms = {};

for (const step of sequence) {
  const stepContentFile = `${__dirname}/sequence${step.url}/content.ts`;
  if (fs.existsSync(stepContentFile)) {
    const content = require(stepContentFile);

    if (content.form) {
      stepForms[step.url] = new Form(content.form);
    }
  }
}

const getNextIncompleteStep = (data: CaseWithId, step: Step): string => {
  // if this step has a form
  if (stepForms[step.url] !== undefined) {
    // and that form has errors
    if (stepForms[step.url].getErrors(data).length > 0) {
      // go to that step
      return step.url;
    } else {
      // if there are no errors go to the next page and work out what to do
      const nextStepUrl = step.getNextStep(data);
      const nextStep = sequence.find(s => s.url === nextStepUrl);

      return nextStep ? getNextIncompleteStep(data, nextStep) : CHECK_ANSWERS_URL;
    }
  }

  // if the page has no form then ask it where to go
  return step.getNextStep(data);
};

export const getNextIncompleteStepUrl = (req: AppRequest): string => {
  const { queryString } = getPathAndQueryString(req);
  const url = getNextIncompleteStep(req.session.userCase, sequence[0]);

  return `${url}${queryString}`;
};

export const getNextStepUrl = (req: AppRequest, data: Partial<Case>): string => {
  const { path, queryString } = getPathAndQueryString(req);
  const nextStep = sequence.find(s => s.url === path);
  const url = nextStep ? nextStep.getNextStep(data) : CHECK_ANSWERS_URL;

  return `${url}${queryString}`;
};

const getPathAndQueryString = (req: AppRequest): { path: string; queryString: string } => {
  const [path, searchParams] = req.originalUrl.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';
  return { path, queryString };
};
