import { pick } from 'lodash';

import { stepsWithContent } from '../../../steps';
import { Step } from '../../../steps/applicant1Sequence';
import { Form, FormContent } from '../../form/Form';
import { Case } from '../case';
import { ApplicationType, YesOrNo } from '../definition';

type StepWithForm = { form?: FormContent } & Step;

const IGNORE_UNREACHABLE_FIELDS = [
  'id',
  'state',
  'divorceOrDissolution',
  'documentsUploaded',
  'applicant1FirstNames',
  'applicant1LastNames',
  'applicationFeeOrderSummary',
  'payments',
];

const applicant2SequenceStart = '/applicant2/you-need-to-review-your-application';

export const getAllPossibleAnswers = (caseState: Partial<Case>, steps: Step[]): string[] => {
  const sequenceWithForms = (steps as StepWithForm[]).filter(step => step.form);

  const getPossibleFields = (step: StepWithForm, fields: string[] = []) => {
    if (step.form) {
      const formFieldNames = new Form(step.form, caseState).getFieldNames().values();
      fields.push(...formFieldNames);
    }

    const nextStepUrl = step.getNextStep(caseState);
    const nextStep = sequenceWithForms.find(sequenceStep => sequenceStep.url === nextStepUrl);
    if (nextStep) {
      return getPossibleFields(nextStep, fields);
    }

    return fields;
  };

  const applicant1Fields = getPossibleFields(sequenceWithForms[0]);
  const firstApplicant2Step = sequenceWithForms.find(step => step.url === applicant2SequenceStart);
  const applicant2Fields =
    firstApplicant2Step && caseState.applicationType === ApplicationType.JOINT_APPLICATION
      ? getPossibleFields(firstApplicant2Step)
      : [];

  return [...applicant1Fields, ...applicant2Fields];
};

export const omitUnreachableAnswers = (caseState: Partial<Case>, steps: Step[]): Partial<Case> =>
  pick(caseState, getAllPossibleAnswers(caseState, steps));

export const getUnreachableAnswersAsNull = (userCase: Partial<Case>): Partial<Case> => {
  const possibleAnswers = getAllPossibleAnswers(userCase, stepsWithContent);
  const answers = Object.fromEntries(
    Object.keys(userCase)
      .filter(
        key => !IGNORE_UNREACHABLE_FIELDS.includes(key) && !possibleAnswers.includes(key) && userCase[key] !== null
      )
      .map(key => [key, null])
  );
  return {
    ...answers,
    ...documentsRequiredChanged(userCase),
  };
};

const documentsRequiredChanged = (caseState: Partial<Case>): Record<string, unknown> | void => {
  let amountOfDocumentsNeeded = 1;
  if (caseState.inTheUk === YesOrNo.NO && caseState.certifiedTranslation === YesOrNo.YES) {
    amountOfDocumentsNeeded++;
  }
  if (
    [
      caseState.applicant1LastNameChangedWhenRelationshipFormed,
      caseState.applicant1NameChangedSinceRelationshipFormed,
    ].includes(YesOrNo.YES)
  ) {
    amountOfDocumentsNeeded++;
  }

  if (
    caseState.cannotUploadDocuments &&
    caseState.uploadedFiles &&
    caseState.cannotUploadDocuments.length + caseState.uploadedFiles.length !== amountOfDocumentsNeeded
  ) {
    return { cannotUpload: null, cannotUploadDocuments: null };
  }
};
