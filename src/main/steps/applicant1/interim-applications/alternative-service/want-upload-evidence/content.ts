import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import {
  form as wantUploadEvidenceForm,
  generateContent as wantUploadEvidenceGenerateContent,
} from '../../common/want-upload-evidence/content';

const en = ({ partner, isDivorce }: CommonContent) => ({
  statement: `The evidence you provide may help the court decide whether your papers can be served in the way you've requested. For example, this may include a photo or screenshot of a recent conversation by text or email, or a post by your ${partner} on social media.`,
});

// @TODO translations
const cy = ({ partner, isDivorce }: CommonContent) => ({
  statement: `The evidence you provide may help the court decide whether your papers can be served in the way you've requested. For example, this may include a photo or screenshot of a recent conversation by text or email, or a post by your ${partner} on social media.`,
});

const languages = {
  en,
  cy,
};

export const form: FormContent = wantUploadEvidenceForm;

export const generateContent: TranslationFn = content => {
  const wantUploadEvidenceContent = wantUploadEvidenceGenerateContent(content);
  const translations = languages[content.language](content);
  return {
    ...wantUploadEvidenceContent,
    ...translations,
  };
};
