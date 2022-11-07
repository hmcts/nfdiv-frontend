import { StepWithContent } from '../../../steps';
import { Form, FormFields } from '../../form/Form';
import { Case } from '../case';

export const getAllPossibleAnswerFieldsForSteps = (caseState: Partial<Case>, steps: StepWithContent[]): string[] => {
  const sequenceWithForms = steps.filter(step => step.form);

  const getPossibleFields = (step: StepWithContent, fields: string[]) => {
    if (step.form) {
      const stepFields: FormFields =
        typeof step.form.fields === 'function' ? step.form.fields(caseState) : step.form.fields;
      const formFieldNames = new Form(stepFields).getFieldNames().values();
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
