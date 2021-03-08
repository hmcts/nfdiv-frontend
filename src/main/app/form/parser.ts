import { pick } from 'lodash';

import { Step } from '../../steps/sequence';
import { Case, CaseDate } from '../case/case';

import { FormContent, FormField, FormOptions } from './Form';

export type DateParser = (property: string, body: Record<string, unknown>) => CaseDate;

export const covertToDateObject: DateParser = (property, body) =>
  ['day', 'month', 'year'].reduce(
    (newDateObj: CaseDate, date: string) => {
      const propertyName = `${property}-${date}`;
      newDateObj[date] = body[propertyName];
      delete body[propertyName];
      return newDateObj;
    },
    { year: '', month: '', day: '' }
  );

type CheckboxParser = ([key, field]: [string, FormField]) => [string, FormField];

export const setupCheckboxParser: CheckboxParser = ([key, field]) => {
  if ((field as FormOptions)?.type === 'checkboxes') {
    field.parser = formData =>
      (field as FormOptions).values.reduce((previous, currentCheckbox) => {
        const checkboxName = currentCheckbox.name as string;
        const checkboxValue = formData[checkboxName] as string[];
        return [...previous, [checkboxName, checkboxValue[checkboxValue.length - 1]]];
      }, [] as string[][]);
  }
  return [key, field];
};

type StepWithForm = { form?: FormContent } & Step;

export const omitUnreachableAnswers = (caseState: Partial<Case>, steps: Step[]): Partial<Case> => {
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

  return pick(caseState, getPossibleFields(sequenceWithForms[0]));
};
