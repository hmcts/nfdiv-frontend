import * as fs from 'fs';
import { createRequire } from 'module';
import { dirname, extname, resolve } from 'path';

import { Case, CaseWithId } from '../app/case/case';
import { ApplicationType, State } from '../app/case/definition';
import { AppRequest, AppSession } from '../app/controller/AppRequest';
import { PageContent, TranslationFn } from '../app/controller/GetController';
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

const requireFromRoot = createRequire(resolve(process.cwd(), 'package.json'));
const isTestRuntime = process.env.NODE_ENV === 'test' || Boolean(process.env.JEST_WORKER_ID);
const sourceStepsBaseDir = resolve(process.cwd(), 'src/main/steps');
const stepsFilePath = isTestRuntime
  ? resolve(process.cwd(), 'src/main/steps/index.ts')
  : resolve(process.cwd(), 'src/main/main/steps/index.js');
const runtimeStepsBaseDir = dirname(stepsFilePath);
const ext = extname(stepsFilePath);
const stepContentFileByUrl: Record<string, string> = {};
const stepContentModuleCache = new Map<string, Record<string, unknown>>();
const stepHasFormCache = new Map<string, boolean>();

const allSequences = [
  applicant1PreSubmissionSequence,
  applicant1PostSubmissionSequence,
  applicant2PreSubmissionSequence,
  applicant2PostSubmissionSequence,
  respondentSequence,
];

allSequences.forEach((sequence: Step[], i: number) => {
  const dir = runtimeStepsBaseDir + (i === 0 || i === 1 ? '/applicant1' : '');
  for (const step of sequence) {
    const stepContentFile = `${dir}${step.url}/content${ext}`;
    if (fs.existsSync(stepContentFile)) {
      stepContentFileByUrl[step.url] = stepContentFile;
    }
  }
});

const getStepContentModule = (contentFile: string): Record<string, unknown> => {
  const cached = stepContentModuleCache.get(contentFile);
  if (cached) {
    return cached;
  }

  const loaded = requireFromRoot(contentFile) as Record<string, unknown>;
  stepContentModuleCache.set(contentFile, loaded);
  return loaded;
};

const stepContentHasForm = (contentFile: string): boolean => {
  const cached = stepHasFormCache.get(contentFile);
  if (cached !== undefined) {
    return cached;
  }

  const source = fs.readFileSync(contentFile, 'utf8');
  const hasForm = /export\s+const\s+form\s*[:=]/.test(source);
  stepHasFormCache.set(contentFile, hasForm);
  return hasForm;
};

const getStepFields = (stepUrl: string, data: CaseWithId): FormFields | undefined => {
  const contentFile = stepContentFileByUrl[stepUrl];
  if (!contentFile || !stepContentHasForm(contentFile)) {
    return undefined;
  }

  const content = getStepContentModule(contentFile) as { form?: { fields?: FormFields | FormFieldsFn } };
  const fields = content.form?.fields;
  if (!fields) {
    return undefined;
  }

  return typeof fields === 'function' ? fields(data) : fields;
};

const getNextIncompleteStep = (data: CaseWithId, step: Step, sequence: Step[], checkedSteps: Step[] = []): string => {
  const stepField = getStepFields(step.url, data);
  // if this step has a form
  if (stepField) {
    // and that form has errors
    const stepForm = new Form(stepField);
    if (!stepForm.isComplete(data) || stepForm.getErrors(data).length > 0) {
      // go to that step
      return step.url;
    } else {
      // if there are no errors go to the next page and work out what to do
      const nextStepUrl = step.getNextStep(data);
      const nextStep = sequence.find(s => s.url === nextStepUrl);

      return nextStep ? getNextIncompleteStep(data, nextStep, sequence, checkedSteps.concat(step)) : step.url;
    }
  }

  // if the page has no form then ask it where to go
  return step.getNextStep(data);
};

export const getNextIncompleteStepUrl = (req: AppRequest): string => {
  const { queryString } = getPathAndQueryString(req);
  const sequence = getUserSequence(req);
  const url = getNextIncompleteStep(req.session.userCase, sequence[getSequenceIndex(sequence, req.session)], sequence);

  return jurisdictionUrls.some(jurisdictionUrl => url.includes(jurisdictionUrl))
    ? `${CHECK_JURISDICTION}${queryString}`
    : `${url}${queryString}`;
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

export const getFirstErroredStep = (req: AppRequest, sequence: Step[]): string | undefined => {
  const userData = req.session.userCase;

  const visitedSteps = new Set<string>();
  let nextStepIndex = 0;
  while (nextStepIndex < sequence.length) {
    const step = sequence[nextStepIndex];
    const stepUrl = step?.url;

    if (!stepUrl) {
      break;
    }

    if (visitedSteps.has(stepUrl)) {
      break;
    }
    visitedSteps.add(stepUrl);

    const fields = getStepFields(stepUrl, userData);

    if (fields) {
      const stepForm = new Form(fields);
      if (stepForm.getErrors(userData)?.length > 0) {
        return stepUrl;
      }
    }

    nextStepIndex = sequence.findIndex(s => s.url === step.getNextStep(userData));
  }
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

const getStepFiles = (runtimeStepDir: string, sourceStepDir: string) => {
  const stepContentFile = `${runtimeStepDir}/content${ext}`;
  const content = fs.existsSync(stepContentFile)
    ? {
        ...(stepContentHasForm(stepContentFile)
          ? {
              form: {
                submit: {
                  text: l => l.continue,
                },
                fields: ((userCase: Partial<Case>, language?: string) => {
                  const module = getStepContentModule(stepContentFile) as {
                    form?: { fields?: FormFields | FormFieldsFn };
                  };
                  const fields = module.form?.fields;
                  if (!fields) {
                    return {} as FormFields;
                  }

                  return typeof fields === 'function' ? fields(userCase, language) : fields;
                }) as FormFieldsFn,
              },
            }
          : {}),
        generateContent: (contentData: Parameters<TranslationFn>[0]) => {
          const module = getStepContentModule(stepContentFile) as {
            generateContent?: (contentInput: unknown) => PageContent;
          };
          return module.generateContent ? module.generateContent(contentData) : {};
        },
      }
    : {
        generateContent: () => ({}),
      };
  const stepViewFile = `${sourceStepDir}/template.njk`;
  const view = fs.existsSync(stepViewFile) ? stepViewFile : `${sourceStepsBaseDir}/common/template.njk`;

  return { content, view };
};

export type StepWithContent = Step & {
  stepDir: string;
  generateContent: TranslationFn;
  form?: FormContent;
  view: string;
};

const getStepsWithContent = (sequence: Step[]): StepWithContent[] => {
  const isApplicant1 = [applicant1PreSubmissionSequence, applicant1PostSubmissionSequence].includes(sequence);
  const runtimeDir = runtimeStepsBaseDir + (isApplicant1 ? '/applicant1' : '');
  const sourceDir = sourceStepsBaseDir + (isApplicant1 ? '/applicant1' : '');

  const results: StepWithContent[] = [];
  for (const step of sequence) {
    const stepDir = `${runtimeDir}${step.url}`;
    const sourceStepDir = `${sourceDir}${step.url}`;
    const { content, view } = getStepFiles(stepDir, sourceStepDir);
    results.push({ stepDir, ...step, ...content, view });
  }
  return results;
};

export const stepsWithContent: StepWithContent[] = allSequences.reduce<StepWithContent[]>(
  (list, sequence) => list.concat(...getStepsWithContent(sequence)),
  []
);
export const stepsWithContentPreSubmissionApplicant1 = getStepsWithContent(applicant1PreSubmissionSequence);
