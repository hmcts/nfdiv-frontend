import { pick } from 'lodash';

import { stepsWithContent } from '../../../steps';
import { Step } from '../../../steps/sequence';
import { FormContent, FormOptions } from '../../form/Form';
import { CaseApi } from '../CaseApi';
import { Case } from '../case';

type StepWithForm = { form?: FormContent } & Step;

export const getAllPossibleAnswers = (caseState: Partial<Case>, steps: Step[]): string[] => {
  const sequenceWithForms = (steps as StepWithForm[]).filter(step => step.form);

  const getPossibleFields = (step: StepWithForm, fields = [] as string[]) => {
    const stepFields = step.form?.fields;
    for (const fieldKey in stepFields) {
      const stepField = stepFields[fieldKey] as FormOptions;
      if (stepField.values && stepField.type !== 'date') {
        for (const [, value] of Object.entries(stepField.values)) {
          if (value.name) {
            fields.push(value.name);
          } else if (value.subFields) {
            fields.push(...Object.keys(value.subFields));
          } else {
            fields.push(fieldKey);
          }
        }
      } else {
        fields.push(fieldKey);
      }
    }

    const nextStepUrl = step.getNextStep(caseState);
    const nextStep = sequenceWithForms.find(step => step.url === nextStepUrl);
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
      .filter(key => !CaseApi.READONLY_FIELDS.includes(key) && !possibleAnswers.includes(key) && userCase[key] !== null)
      .map(key => [key, null])
  );
};
