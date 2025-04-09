import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import { EVIDENCE_RECEIVED_APPLICATION } from '../../../../urls';

const en = ({ partner }: CommonContent) => ({
  title: `Check your ${partner}'s representative details`,
  line1: `These are the details of your ${partner}'s representative.`,
  line2: `If these details aren't correct, your ${partner} needs to let the court know.`,
  nameOfOrganisation: 'Name of organisation',
  continueButton: {
    text: 'Continue',
    url: EVIDENCE_RECEIVED_APPLICATION,
  },
});

// @TODO translations should be verified
const cy = ({ partner }: CommonContent) => ({
  title: `Gwirio manylion cynrychiolydd eich ${partner}`,
  line1: `Dyma fanylion cynrychiolydd eich ${partner}.`,
  line2: `Os nad yw’r manylion hyn yn gywir, mae angen i’ch ${partner} adael i’r llys wybod.`,
  nameOfOrganisation: 'Enw’r sefydliad',
  continueButton: {
    text: 'Parhau',
    url: EVIDENCE_RECEIVED_APPLICATION,
  },
});

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
