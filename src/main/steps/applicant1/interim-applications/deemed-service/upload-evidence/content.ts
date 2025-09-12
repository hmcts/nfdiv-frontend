import { getFormattedDate } from '../../../../../app/case/answers/formatDate';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { SupportedLanguages } from '../../../../../modules/i18n';
import { CommonContent } from '../../../../common/common.content';
import {
  form as uploadEvidenceForm,
  generateContent as uploadEvidenceGenerateContent,
} from '../../common/upload-evidence/content';

const en = ({ userCase }: CommonContent) => ({
  statement: `Upload your evidence to support your application for deemed service. This should be evidence you've found from after the date that your application was issued: ${getFormattedDate(
    userCase.issueDate
  )}`,
});

const cy: typeof en = ({ userCase }: CommonContent) => ({
  statement: `Uwchlwytho eich tystiolaeth i gefnogi eich cais am gyflwyno tybiedig. Dylai hyn fod yn dystiolaeth bu ichi ddod o hyd iddi ar ôl y dyddiad cafodd eich cais ei gyflwyno:  ${getFormattedDate(
    userCase.issueDate,
    SupportedLanguages.Cy
  )}`,
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
