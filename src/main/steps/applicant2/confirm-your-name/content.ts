import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/confirm-your-name/content';

const en = ({ userCase, required }) => ({
  title: `Is ${userCase.applicant2FirstNames} ${userCase.applicant2MiddleNames} ${userCase.applicant2LastNames} your full name, including any middle names?`,
  errors: {
    applicant2ConfirmFullName: {
      required,
    },
  },
});

const cy = ({ userCase, required }) => ({
  title: `Ai ${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${userCase.applicant1LastNames} yw eich enw llawn, gan gynnwys unrhyw enwau canol?`,
  yes: "Ie, dyna fy enw llawn",
  no: "Na, nid dyna fy enw llawn",
  errors: {
    applicant1ConfirmFullName: {
      required,
    },
  },
});

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
