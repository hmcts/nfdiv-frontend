import { pick } from 'lodash';

import { stepsWithContent } from '../../../steps';
import { Step } from '../../../steps/sequence';
import { Form, FormContent } from '../../form/Form';
import { CaseApi } from '../CaseApi';
import { Case } from '../case';

type StepWithForm = { form?: FormContent } & Step;

export const getAllPossibleAnswers = (caseState: Partial<Case>, steps: Step[]): string[] => {
  const sequenceWithForms = (steps as StepWithForm[]).filter(step => step.form);

  const getPossibleFields = (step: StepWithForm, fields: string[] = []) => {
    if (step.form) {
      const formFieldNames = new Form(step.form).getFieldNames().values();
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
  const possibleAnswers = getAllPossibleAnswers(userCase, stepsWithContent);
  return Object.fromEntries(
    Object.keys(userCase)
      .filter(key => !CaseApi.SPECIAL_FIELDS.includes(key) && !possibleAnswers.includes(key) && userCase[key] !== null)
      .map(key => [key, null])
  );
};
