import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE, PROCESS_SERVER_DOCS } from '../../../../urls';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'You need to arrange a process server',
  line1: `You can now <a class="govuk-link" id="downloadPapersLink" href="${PROCESS_SERVER_DOCS}">download the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } from your account</a>`,
  whatHappensNextHeader: 'What happens next',
  line2: `You now need to find and employ a process server. You'll need to give them your ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } so they can hand serve them on your ${partner}.`,
  line3:
    'When they have delivered the papers, they will complete a certificate of service (FP6) and send it to you. You will need to send this to the court.',
  hubUrl: {
    text: 'Return to your account',
    url: HUB_PAGE,
  },
});

// @TODO translations should be completed then verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: 'You need to arrange a process server',
  line1: `You can now <a class="govuk-link" id="downloadPapersLink" href="${PROCESS_SERVER_DOCS}">download the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } from your account</a>`,
  whatHappensNextHeader: 'What happens next',
  line2: `You now need to find and employ a process server. You'll need to give them your ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } so they can hand serve them on your ${partner}.`,
  line3:
    'When they have delivered the papers, they will complete a certificate of service (FP6) and send it to you. You will need to send this to the court.',
  hubUrl: {
    text: 'Return to your account',
    url: HUB_PAGE,
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);

  return {
    ...translations,
  };
};
