import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as uploadEvidenceForm,
  generateContent as uploadEvidenceGenerateContent,
} from '../../common/upload-evidence/content';

const en = () => ({
  title: "Upload your 'no trace' certificate",
});

const cy: typeof en = () => ({
  title: "Upload your 'no trace' certificate",
});

const languages = {
  en,
  cy,
};

export const form: FormContent = uploadEvidenceForm;

export const generateContent: TranslationFn = content => {
  const applicant1UploadEvidenceContent = uploadEvidenceGenerateContent(content);
  const translations = languages[content.language]();
  return {
    ...applicant1UploadEvidenceContent,
    ...translations,
  };
};
