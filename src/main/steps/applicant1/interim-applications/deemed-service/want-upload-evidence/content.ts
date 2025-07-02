import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import {
  form as wantUploadEvidenceForm,
  generateContent as wantUploadEvidenceGenerateContent,
} from '../../common/want-upload-evidence/content';

const en = ({ partner, isDivorce }: CommonContent) => ({
  statement: `Any evidence you can provide will help the court decide whether it is satisfied that your ${partner} has received the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }. For example, this could include a photo or screenshot of a recent conversation by text, email or social media.`,
});

// @TODO translations
const cy = ({ partner, isDivorce }: CommonContent) => ({
  statement: `Any evidence you can provide will help the court decide whether it is satisfied that your ${partner} has received the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }. For example, this could include a photo or screenshot of a recent conversation by text, email or social media.`,
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
