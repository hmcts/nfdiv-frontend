import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { SupportedLanguages } from '../../../modules/i18n';
import type { CommonContent } from '../../common/common.content';

const en = ({ partner, userCase }: CommonContent) => ({
  title: `Your ${partner}${
    userCase.applicant1SolicitorRepresented === YesOrNo.YES ? "'s solicitor" : ''
  } needs to confirm your joint application`,
  line1: `Your ${partner}${
    userCase.applicant1SolicitorRepresented === YesOrNo.YES ? "'s solicitor" : ''
  } needs to confirm your joint application. They have been sent an email inviting them to review your combined answers and confirm the application. They should do this by `,
  reviewDate: getFormattedDate(userCase.dueDate),
  line2: `When they have confirmed${
    userCase.applicant1HelpPayingNeeded === YesOrNo.YES && userCase.applicant2HelpPayingNeeded === YesOrNo.YES
      ? ''
      : ' and paid'
  }, then the application will be submitted.`,
});

const cy: typeof en = ({ partner, userCase }: CommonContent) => ({
  title: `Mae eich ${partner} angen cadarnhau eich cais ar y cyd`,
  line1: `Mae eich ${partner} angen cadarnhau eich cais ar y cyd. Maent wedi cael neges e-bost yn eu gwahodd i adolygu’ch atebion cyfun a chadarnhau’r cais. Dylent wneud hyn erbyn `,
  reviewDate: getFormattedDate(userCase.dueDate, SupportedLanguages.Cy),
  line2: `Pan fyddant wedi cadarnhau’r cais${
    userCase.applicant1HelpPayingNeeded === YesOrNo.YES && userCase.applicant2HelpPayingNeeded === YesOrNo.YES
      ? ''
      : ' a thalu'
  }, yna bydd y cais yn cael ei gyflwyno.`,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => languages[content.language](content);
