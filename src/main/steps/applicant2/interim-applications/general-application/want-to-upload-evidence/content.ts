import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { applicant2Form } from '../../../../applicant1/interim-applications/common/want-upload-evidence/content';
import { generateContent as applicant1GenerateContent } from '../../../../applicant1/interim-applications/general-application/want-to-upload-evidence/content';

export const form: FormContent = applicant2Form;
export const generateContent: TranslationFn = content => {
  return {
    ...applicant1GenerateContent(content),
    form,
  };
};
