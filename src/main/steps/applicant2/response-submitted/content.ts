import { TranslationFn } from '../../../app/controller/GetController';
import type { CommonContent } from '../../common/common.content';
import { formattedCaseId } from '../../common/content.utils';
import { generateContent as hubPageContent } from '../needs-to-confirm-joint-application/content';

const en = ({ partner, feedbackLink }: CommonContent) => ({
  title: `Your ${partner} needs to confirm your joint application`,
  yourReferenceNumber: 'Reference number',
  whatHappensNext: 'What happens next',
  feedback: "We'd like to hear your thoughts",
  feedbackLine1: 'Complete this short, 5-minute survey to help improve our services for you and others.',
  feedbackLine2: {
    part1: 'Leave your feedback',
    link: feedbackLink,
  },
});

const cy: typeof en = ({ partner, feedbackLink }: CommonContent) => ({
  title: `Mae eich ${partner} angen cadarnhau eich cais ar y cyd`,
  yourReferenceNumber: 'Cyfeirnod yr achos',
  whatHappensNext: 'Beth fydd yn digwydd nesaf',
  feedback: "Helpwch ni i wella'r gwasanaeth hwn",
  feedbackLine1: 'Cwblhewch yr arolwg 5 munud hwn i helpu i wella ein gwasanaethau i chi ac eraill.',
  feedbackLine2: {
    part1: 'Rhoi adborth.',
    link: feedbackLink,
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { userCase, language } = content;
  const referenceNumber = formattedCaseId(userCase.id);

  return {
    ...languages[language]({ ...content, referenceNumber }),
    ...hubPageContent(content),
    referenceNumber,
  };
};
