import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import {
  form as uploadEvidenceForm,
  generateContent as uploadEvidenceGenerateContent,
} from '../../common/upload-evidence/content';

const en = ({ userCase }: CommonContent) => ({
  statement: `Upload your evidence to support your application for deemed service. This should be evidence you've found from after the date that your application was issued: ${userCase.issueDate}`,
});

const cy: typeof en = ({ userCase }: CommonContent) => ({
  statement: `Upload your evidence to support your application for deemed service. This should be evidence you've found from after the date that your application was issued: ${userCase.issueDate}`,
});

const languages = {
  en,
  cy,
};

export const form: FormContent = uploadEvidenceForm;

export const generateContent: TranslationFn = content => {
  const applicant1UploadEvidenceContent = uploadEvidenceGenerateContent(content);
  const translations = languages[content.language](content);
  return {
    ...applicant1UploadEvidenceContent,
    ...translations,
  };
};
