import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as wantUploadEvidenceForm,
  generateContent as wantUploadEvidenceGenerateContent,
} from '../../common/want-upload-evidence/content';

const en = () => ({
  title: 'Do you want to provide a statement or upload evidence?',
  statement:
    'You should provide as much detail as you can. Your statement and any evidence you provide will help the court decide whether to grant your application.',
  errors: {
    applicant1InterimAppsCanUploadEvidence: {
      required: "Select 'Yes' if you can provide a statement or upload evidence.",
    },
  },
});

// @TODO translations
const cy = () => ({
  title: 'Do you want to provide a statement or upload evidence?',
  statement:
    'You should provide as much detail as you can. Your statement and any evidence you provide will help the court decide whether to grant your application.',
  errors: {
    applicant1InterimAppsCanUploadEvidence: {
      required: "Select 'Yes' if you can provide a statement or upload evidence.",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = wantUploadEvidenceForm;

export const generateContent: TranslationFn = content => {
  const wantUploadEvidenceContent = wantUploadEvidenceGenerateContent(content);
  const translations = languages[content.language]();
  return {
    ...wantUploadEvidenceContent,
    ...translations,
  };
};
