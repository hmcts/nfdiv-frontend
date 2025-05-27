import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE } from '../../../../urls';

const en = ({ isDivorce, partner }: CommonContent, applicant1EmailAddress: string | undefined) => ({
  title: `${isDivorce ? 'Divorce papers' : 'Papers to end your Civil Partnership'} sent`,
  line1: `We have sent the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to ${applicant1EmailAddress}`,
  whatHappensNextHeader: 'What happens next',
  line2: `You need to give these to your process server so they can hand deliver them to your ${partner}.`,
  line3:
    'When they have delivered the papers, they will complete a certificate of service (FP6) and send it to you. You will need to send this to the court.',
  hubUrl: {
    text: 'Return to hub screen',
    url: HUB_PAGE,
  },
});

// @TODO translations should be completed then verified
const cy = ({ isDivorce, partner }: CommonContent, applicant1EmailAddress: string | undefined) => ({
  title: `${isDivorce ? 'Divorce papers' : 'Papers to end your Civil Partnership'} sent`,
  line1: `We have sent the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to ${applicant1EmailAddress}`,
  whatHappensNextHeader: 'What happens next',
  line2: `You need to give these to your process server so they can hand deliver them to your ${partner}.`,
  line3:
    'When they have delivered the papers, they will complete a certificate of service (FP6) and send it to you. You will need to send this to the court.',
  hubUrl: {
    text: 'Return to hub screen',
    url: HUB_PAGE,
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content, content.userCase.applicant1Email);

  return {
    ...translations,
  };
};
