import { getFormattedDate } from '../../../../../app/case/answers/formatDate';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { SupportedLanguages } from '../../../../../modules/i18n';
import { CommonContent } from '../../../../common/common.content';
import {
  form as uploadEvidenceForm,
  generateContent as uploadEvidenceGenerateContent,
} from '../../common/upload-evidence/content';

const en = ({ userCase, partner }: CommonContent) => ({
  statement: `Upload your evidence to support your application for deemed service. This should be evidence you've found from after the date that your application was issued: ${getFormattedDate(
    userCase.issueDate
  )}`,
  evidenceDateReminder: `Make sure that the photo or screenshot clearly shows the date of the conversations between you and your ${partner}. If the date is not visible, the court may reject your application.`,
});

const cy: typeof en = ({ userCase, partner }: CommonContent) => ({
  statement: `Uwchlwythwch eich tystiolaeth i gefnogi eich cais am gyflwyno tybiedig. Dylai hon fod yn dystiolaeth a ddarganfyddwyd ar ôl y dyddiad y cyflwynwyd eich cais:  ${getFormattedDate(
    userCase.issueDate,
    SupportedLanguages.Cy
  )}`,
  evidenceDateReminder: `Gwnewch yn siŵr bod y llun neu'r sgrinlun yn dangos dyddiad y sgyrsiau rhyngoch chi a'ch ${partner} yn glir. Os nad yw’r dyddiad yn weladwy, gall y llys wrthod eich cais.`,
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
