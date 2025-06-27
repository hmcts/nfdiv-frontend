import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import {
  form as uploadEvidenceForm,
  generateContent as uploadEvidenceGenerateContent,
} from '../../common/upload-evidence/content';

const en = ({ partner }: CommonContent) => ({
  title: `Upload a recent picture of your ${partner}`,
  statement: '',
  line2: 'Make sure your picture:',
  toInclude: {
    bulletOne: `Clearly shows your ${partner}'s face`,
    bulletTwo: 'Does not include any other people, to avoid confusion',
    bulletThree: 'Does not include any children',
  },
  line3: 'Any blurred images, or images that show children or other people cannot be accepted by the court.',
  line4: '',
  line5: '',
  cannotUploadInfo:
    'You can send your documents to the court by post or webform. You’ll receive details of how to send them after you’ve submitted this application.',
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Upload a recent picture of your ${partner}`,
  statement: '',
  line2: 'Make sure your picture:',
  toInclude: {
    bulletOne: `Clearly shows your ${partner}'s face`,
    bulletTwo: 'Does not include any other people, to avoid confusion',
    bulletThree: 'Does not include any children',
  },
  line3: 'Any blurred images, or images that show children or other people cannot be accepted by the court.',
  line4: '',
  line5: '',
  cannotUploadInfo:
    'You can send your documents to the court by post or webform. You’ll receive details of how to send them after you’ve submitted this application.',
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
