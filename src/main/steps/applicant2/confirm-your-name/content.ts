import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/confirm-your-name/content';

const en = ({ userCase, required }) => ({
  title: {
    part1: 'Is ',
    part2: `${userCase.applicant2FirstNames} ${userCase.applicant2MiddleNames} ${userCase.applicant2LastNames}`,
    part3: ' your full name, including any middle names?',
  },
  errors: {
    applicant2ConfirmFullName: {
      required,
    },
  },
});

const cy: typeof en = en;

const applicant1FormFields = applicant1Form.fields as FormFields;
export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2ConfirmFullName: applicant1FormFields.applicant1ConfirmFullName,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...applicant1GenerateContent(content),
    ...translations,
    form,
  };
};
