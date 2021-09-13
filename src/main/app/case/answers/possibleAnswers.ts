import { pick } from 'lodash';

import { StepWithContent, stepsWithContentApplicant1, stepsWithContentApplicant2 } from '../../../steps';
import { Form } from '../../form/Form';
import { Case } from '../case';

const getAllPossibleAnswers = (caseState: Partial<Case>, steps: StepWithContent[]): string[] => {
  return steps.filter(step => step.form).flatMap(step => [...new Form(step.form, caseState).getFieldNames().values()]);
};

export const getAllPossibleAnswersForPath = (caseState: Partial<Case>, steps: StepWithContent[]): string[] => {
  const sequenceWithForms = steps.filter(step => step.form);

  const getPossibleFields = (step: StepWithContent, fields: string[]) => {
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

  return getPossibleFields(sequenceWithForms[0], []);
};

export const omitUnreachableAnswers = (caseState: Partial<Case>, steps: StepWithContent[]): Partial<Case> =>
  pick(caseState, getAllPossibleAnswersForPath(caseState, steps));

export const getUnreachableAnswersAsNull = (userCase: Partial<Case>, isApplicant2: boolean): Partial<Case> => {
  const steps = isApplicant2 ? stepsWithContentApplicant2 : stepsWithContentApplicant1;
  const everyField = getAllPossibleAnswers(userCase, steps);
  const possibleAnswers = getAllPossibleAnswersForPath(userCase, steps);

  return Object.fromEntries(
    everyField.filter(key => !possibleAnswers.includes(key) && userCase[key]).map(key => [key, null])
  );
};
