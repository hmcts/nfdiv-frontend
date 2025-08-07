import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import {
  form as uploadEvidenceForm,
  generateContent as uploadEvidenceGenerateContent,
} from '../../common/upload-evidence/content';

const en = ({ partner }: CommonContent) => ({
  statement: `Your evidence should show that your ${partner} actively uses the email address, phone number or social media platform to want to use to send the papers.`,
  line2: 'It may be helpful if your images show:',
  toInclude: {
    partnersName: `your ${partner}'s name`,
    dateMessageSent: 'the date the messages were sent',
    partnersEmailInfo: `your ${partner}'s email address`,
    partnersPhoneInfo: `your ${partner}'s phone number`,
    partnersSocialMediaUsernameInfo: `your ${partner}'s social media username`,
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  statement: `Your evidence should show that your ${partner} actively uses the email address, phone number or social media platform to want to use to send the papers.`,
  line2: 'It may be helpful if your images show:',
  toInclude: {
    partnersName: `your ${partner}'s name`,
    dateMessageSent: 'the date the messages were sent',
    partnersEmailInfo: `your ${partner}'s email address`,
    partnersPhoneInfo: `your ${partner}'s phone number`,
    partnersSocialMediaUsernameInfo: `your ${partner}'s social media username`,
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = uploadEvidenceForm;

export const generateContent: TranslationFn = content => {
  const applicant1UploadEvidenceContent = uploadEvidenceGenerateContent(content);
  const translations = languages[content.language](content);
  const waysSelectedForDifferent = content.userCase.applicant1AltServiceDifferentWays || [];
  const methodSelected = content.userCase.applicant1AltServiceMethod;
  return {
    ...applicant1UploadEvidenceContent,
    ...translations,
    waysSelectedForDifferent,
    methodSelected,
  };
};
