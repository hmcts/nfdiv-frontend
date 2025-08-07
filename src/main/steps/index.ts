import * as fs from 'fs';
import { extname } from 'path';
import { Logger } from '@hmcts/nodejs-logging';
import { CaseWithId } from '../app/case/case';
import { ApplicationType, State } from '../app/case/definition';
import { AppRequest, AppSession } from '../app/controller/AppRequest';
import { TranslationFn } from '../app/controller/GetController';
import { Form, FormContent, FormFields, FormFieldsFn } from '../app/form/Form';

import { Step, applicant1PostSubmissionSequence, applicant1PreSubmissionSequence } from './applicant1Sequence';
import { applicant2PostSubmissionSequence, applicant2PreSubmissionSequence } from './applicant2Sequence';
import { respondentSequence } from './respondentSequence';
import { currentStateFn } from './state-sequence';
import { jurisdictionUrls } from './url-utils';
import {
  APPLICANT_2,
  APPLICATION_SUBMITTED,
  CHECK_ANSWERS_URL,
  CHECK_JURISDICTION,
  CONFIRM_JOINT_APPLICATION,
  CONTINUE_WITH_YOUR_APPLICATION,
  HOME_URL,
  JOINT_APPLICATION_SUBMITTED,
  READ_THE_RESPONSE,
  RESPONDENT,
} from './urls';
// import { deemedServiceApplicationSequence } from './deemedServiceApplicationSequence';

const stepFields: Record<string, FormFields | FormFieldsFn> = {};
const logger = Logger.getLogger('access-code-post-controller');
const ext = extname(__filename);

const allSequences = [
  applicant1PreSubmissionSequence,
  applicant1PostSubmissionSequence,
  // deemedServiceApplicationSequence,
  applicant2PreSubmissionSequence,
  applicant2PostSubmissionSequence,
  respondentSequence
];

allSequences.forEach((sequence: Step[], i: number) => {
  const dir = __dirname + ([0, 1].includes(i) ? '/applicant1' : '');
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

export const getNextIncompleteStepUrl = (req: AppRequest): string => {
  const { queryString } = getPathAndQueryString(req);
  const sequence = getUserSequence(req);
  const url = getNextIncompleteStep(req.session.userCase, sequence[getSequenceIndex(sequence, req.session)], sequence);

  return jurisdictionUrls.some(jurisdictionUrl => url.includes(jurisdictionUrl))
    ? `${CHECK_JURISDICTION}${queryString}`
    : `${url}${queryString}`;
};

const getNextIncompleteStep = (data: CaseWithId, step: Step, sequence: Step[], checkedSteps: Step[] = []): string => {
  logger.info(step.url);
  const stepField = stepFields[step.url];
  logger.info(stepField);
  logger.info(stepField);
  // if this step has a form
  if (stepField) {
    // and that form has errors
    if (!formIsComplete(data, stepField)) {
      // go to that step
      return step.url;
    } else {
      // if there are no errors go to the next page and work out what to do
      logger.info("NEXT STEP:");
      const nextStepUrl = step.getNextStep(data);
      const nextStep = sequence.find(s => s.url === nextStepUrl);
      logger.info(nextStep);

      return nextStep ? getNextIncompleteStep(data, nextStep, sequence, checkedSteps.concat(step)) : step.url;
    }
  }

  // if the page has no form then ask it where to go
  return step.getNextStep(data);
};

const formIsComplete = (data: CaseWithId, stepField: FormFields | FormFieldsFn) => {
  if (!stepField) {
    return true;
  }

  const fields = typeof stepField === 'function' ? stepField(data) : stepField;
  const stepForm = new Form(fields);

  logger.info("Step form:");
  logger.info(stepForm);

  logger.info("FORM IS COMPLETE:");
  logger.info(stepForm.isComplete(data));

  logger.info("FORM ERRORS:");
  logger.info(stepForm.getErrors(data));

  logger.info("FORM:");
  logger.info(new Form(fields));

  for (const field of new Form(fields).getFieldNames().values()) {
    logger.info("FIELD:");
    logger.info(field);
  }

  return stepForm.isComplete(data) && !(stepForm.getErrors(data).length > 0);
}

export const getErroredStepUrlForSequence = (
  req: AppRequest,
  sequence: Step[],
): string | undefined => {
  const userData = req.session.userCase;
  let stepIndex = 0;

  while (stepIndex < sequence.length) {
    const step = sequence[stepIndex];
    const stepUrl = step.url;

    const stepField = stepFields[stepUrl];
    const fields = typeof stepField === 'function' ? stepField(userData) : stepField;

    if (fields) {
      const stepForm = new Form(fields);
      if ((stepForm.getErrors(userData)?.length > 0)) {
        logger.info(stepForm.getErrors(userData));
        return step.url;
      }
    }

    stepIndex = sequence.findIndex(s => s.url === step.getNextStep(userData));
  }
};

export const findIncompleteStepForSequence = (req: AppRequest, sequence: Step[]): string => {
  // logger.info(stepFields);
  let nextStepUrl = getNextIncompleteStep(req.session.userCase, sequence[0], sequence);
  let nextStep: Step | undefined;
  let stepField = stepFields[nextStepUrl];

  while (nextStepUrl && (!stepField || formIsComplete(req.session.userCase, stepField))) {
    nextStep = sequence.find(s => s.url === nextStepUrl);

    nextStepUrl = getNextIncompleteStep(req.session.userCase, nextStep as Step, sequence);
    stepField = stepFields[nextStepUrl];
    logger.info(nextStep);
    logger.info(nextStepUrl);
    logger.info("STEP FIELD:");
    logger.info(stepField);
  }

  logger.info(nextStep);
  logger.info(nextStepUrl);
  logger.info(stepField);
  logger.info(formIsComplete(req.session.userCase, stepField));

  return nextStepUrl;
};

const getSequenceIndex = (sequence: Step[], session: AppSession): number => {
  if ([State.ConditionalOrderDrafted, State.ConditionalOrderPending].includes(session.userCase.state)) {
    return session.isApplicant2
      ? sequence.findIndex(s => s.url.includes(CONTINUE_WITH_YOUR_APPLICATION))
      : sequence.findIndex(s => s.url.includes(READ_THE_RESPONSE));
  }

  return 0;
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

  if (req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION && req.session.isApplicant2) {
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
