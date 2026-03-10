import { FormContent } from '../../../../../app/form/Form';
import { TranslationFn } from '../../../../../app/controller/GetController';
import {
  applicant2Form as interruptionForm,
} from '../../../../applicant1/interim-applications/common/interruption/content';
import {
  generateContent as generateInterruptionContent,
} from '../../../../applicant1/interim-applications/general-application/interruption/content';

export const form: FormContent = interruptionForm;

export const generateContent: TranslationFn = content => {
  const interruptionContent = generateInterruptionContent(content);
  return {
    ...interruptionContent,
    form,
  };
};