import { GeneralApplicationHearingNotRequired } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../../../applicant1/interim-applications/general-application/application-cost/content';

export const form: FormContent = applicant1Form;

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  const showNoConsentContent =
    content.userCase.applicant2GenAppHearingNotRequired === GeneralApplicationHearingNotRequired.NO;

  return {
    ...applicant1Content,
    showNoConsentContent,
    form,
  };
};
