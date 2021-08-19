import { pick } from 'lodash';

import { stepsWithContentApplicant1, stepsWithContentApplicant2 } from '../../../steps';
import { Step } from '../../../steps/applicant1Sequence';
import { Form, FormContent } from '../../form/Form';
import { Case } from '../case';
import { ApplicationType, YesOrNo } from '../definition';

type StepWithForm = { form?: FormContent } & Step;

const IGNORE_UNREACHABLE_FIELDS = [
  'id',
  'state',
  'divorceOrDissolution',
  'applicant1DocumentsUploaded',
  'applicant2DocumentsUploaded',
  'applicant1FirstNames',
  'applicant1LastNames',
  'applicationFeeOrderSummary',
  'payments',
  'dueDate',
  'dateSubmitted',
  'respondentUserId',
  'applicant1IConfirmPrayer',
  'applicant1IBelieveApplicationIsTrue',
  'applicant2IConfirmPrayer',
  'applicant2IBelieveApplicationIsTrue',
];

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

  return getPossibleFields(sequenceWithForms[0]);
};

export const omitUnreachableAnswers = (caseState: Partial<Case>, steps: Step[]): Partial<Case> =>
  pick(caseState, getAllPossibleAnswers(caseState, steps));

export const getUnreachableAnswersAsNull = (userCase: Partial<Case>): Partial<Case> => {
  const possibleAnswers = [
    ...getAllPossibleAnswers(userCase, stepsWithContentApplicant1),
    ...(userCase.applicationType === ApplicationType.JOINT_APPLICATION
      ? getAllPossibleAnswers(userCase, stepsWithContentApplicant2)
      : []),
  ];

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
  let applicant1AmountOfDocumentsNeeded = 1;
  if (caseState.inTheUk === YesOrNo.NO && caseState.certifiedTranslation === YesOrNo.YES) {
    applicant1AmountOfDocumentsNeeded++;
  }
  if (
    [
      caseState.applicant1LastNameChangedWhenRelationshipFormed,
      caseState.applicant1NameChangedSinceRelationshipFormed,
    ].includes(YesOrNo.YES)
  ) {
    applicant1AmountOfDocumentsNeeded++;
  }

  if (
    caseState.applicant1CannotUploadDocuments &&
    caseState.applicant1UploadedFiles &&
    caseState.applicant1CannotUploadDocuments.length + caseState.applicant1UploadedFiles.length !==
      applicant1AmountOfDocumentsNeeded
  ) {
    return { applicant1CannotUpload: null, applicant1CannotUploadDocuments: null };
  }
};
