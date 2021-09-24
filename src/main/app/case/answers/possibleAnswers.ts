import { pick } from 'lodash';

import { StepWithContent, stepsWithContentApplicant1, stepsWithContentApplicant2 } from '../../../steps';
import { Form } from '../../form/Form';
import { Case } from '../case';
import { ApplicationType, YesOrNo } from '../definition';

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

export const getUnreachableAnswersAsNull = (userCase: Partial<Case>): Partial<Case> => {
  const everyField = getAllPossibleAnswers(userCase, stepsWithContentApplicant1);
  const possibleAnswers = getAllPossibleAnswersForPath(userCase, stepsWithContentApplicant1);

  if (userCase.applicationType === ApplicationType.JOINT_APPLICATION) {
    everyField.push(...getAllPossibleAnswers(userCase, stepsWithContentApplicant2));
    possibleAnswers.push(...getAllPossibleAnswersForPath(userCase, stepsWithContentApplicant2));
  }

  return Object.fromEntries(
    everyField.filter(key => !possibleAnswers.includes(key) && userCase[key]).map(key => [key, null])
  );
};

export const deleteAddressIfPrivate = (userCase: Partial<Case>): void => {
  if (
    userCase.applicationType === ApplicationType.SOLE_APPLICATION &&
    userCase.applicant2AddressPrivate === YesOrNo.YES
  ) {
    delete userCase.applicant2Address1;
    delete userCase.applicant2Address2;
    delete userCase.applicant2Address3;
    delete userCase.applicant2AddressTown;
    delete userCase.applicant2AddressCounty;
    delete userCase.applicant2AddressCountry;
    delete userCase.applicant2AddressPostcode;
  }
};
