import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { applicant2Form } from '../../../../applicant1/interim-applications/common/check-answers/content';
import { generateContent as applicant1GenerateContent } from '../../../../applicant1/interim-applications/general-application/check-answers/content';

export const form: FormContent = applicant2Form;

export const generateContent: TranslationFn = content => {
  return {
    ...applicant1GenerateContent(content),
    form: applicant2Form,
  };
};
