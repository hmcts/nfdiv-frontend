import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import { EVIDENCE_RECEIVED_APPLICATION } from '../../../../urls';

const en = ({ partner }: CommonContent) => ({
  title: `Check your ${partner}'s representative details`,
  line1: `These are the details of your ${partner}'s representative.`,
  line2: `If these details aren't correct, your ${partner} needs to let the court know.`,
  continueButton: {
    text: 'Continue',
    url: EVIDENCE_RECEIVED_APPLICATION,
  },
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const applicant2SolicitorFirmName = content.userCase.applicant2SolicitorFirmName;
  return {
    ...translations,
    applicant2SolicitorFirmName,
  };
};
