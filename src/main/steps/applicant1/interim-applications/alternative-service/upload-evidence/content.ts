import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import {
  form as uploadEvidenceForm,
  generateContent as uploadEvidenceGenerateContent,
} from '../../common/upload-evidence/content';

const en = ({ partner }: CommonContent) => ({
  statement: `Your evidence should show that your ${partner} actively uses the email address, phone number or social media platform you want to use to send the papers.`,
  line2: 'It may be helpful if your images show:',
  evidenceDateReminder: `Make sure that the photo or screenshot clearly shows the date of the conversations between you and your ${partner}. If the date is not visible, the court may reject your application.`,
  toInclude: {
    partnersName: `your ${partner}'s name`,
    dateMessageSent: 'the date the messages were sent',
    partnersEmailInfo: `your ${partner}'s email address`,
    partnersPhoneInfo: `your ${partner}'s phone number`,
    partnersSocialMediaUsernameInfo: `your ${partner}'s social media username`,
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  statement: `Dylai eich tystiolaeth ddangos bod eich ${partner} yn defnyddio’r cyfeiriad e-bost, rhif ffôn neu’r platfform cyfryngau cymdeithasol yn rheolaidd i fod eisiau ei ddefnyddio i anfon y papurau.`,
  line2: 'Gallai fod yn ddefnyddiol os byddai eich lluniau yn dangos:',
  evidenceDateReminder: `Gwnewch yn siŵr bod y llun neu'r sgrinlun yn dangos dyddiad y sgyrsiau rhyngoch chi a'ch ${partner} yn glir. Os nad yw’r dyddiad yn weladwy, gall y llys wrthod eich cais.`,
  toInclude: {
    partnersName: `enw’ch ${partner}`,
    dateMessageSent: 'y dyddiadau pan anfonwyd y negeseuon',
    partnersEmailInfo: `cyfeiriad e-bost eich ${partner}`,
    partnersPhoneInfo: `rhif ffôn eich ${partner}`,
    partnersSocialMediaUsernameInfo: `enw defnyddiwr cyfryngau cymdeithasol eich ${partner}`,
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
