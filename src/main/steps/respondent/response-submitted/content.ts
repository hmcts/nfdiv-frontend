import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import type { CommonContent } from '../../common/common.content';
import { formattedCaseId } from '../../common/content.utils';
import { HUB_PAGE, RESPONDENT } from '../../urls';
import { generateContent as hubPageContent } from '../hub-page/content';

const en = ({ feedbackLink }: CommonContent) => ({
  responseSubmittedTitle: 'Response submitted',
  yourReferenceNumber: 'Reference number',
  whatHappensNext: 'What happens next',
  feedback: "We'd like to hear your thoughts",
  feedbackLine1: 'Complete this short, 5-minute survey to help improve our services for you and others.',
  feedbackLine2: {
    part1: 'Leave your feedback',
    link: feedbackLink,
  },
  visitHubSubHeading: 'Visit your application hub',
  visitHubText: `You can <a href=${
    RESPONDENT + HUB_PAGE
  } class="govuk-link">view the progress of your application</a> in the application hub.`,
});

const cy: typeof en = ({ feedbackLink }: CommonContent) => ({
  responseSubmittedTitle: "Ymateb wedi'i gyflwyno",
  yourReferenceNumber: 'Cyfeirnod yr achos',
  whatHappensNext: 'Beth fydd yn digwydd nesaf',
  feedback: "Helpwch ni i wella'r gwasanaeth hwn",
  feedbackLine1: 'Cwblhewch yr arolwg 5 munud hwn i helpu i wella ein gwasanaethau i chi ac eraill.',
  feedbackLine2: {
    part1: 'Rhoi adborth.',
    link: feedbackLink,
  },
  visitHubSubHeading: "Ymweld â'ch gwasanaeth ceisiadau",
  visitHubText: `Gallwch <a href=${
    RESPONDENT + HUB_PAGE
  } class="govuk-link">weld cynnydd eich cais</a> yn y gwasanaeth ceisiadau.`,
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
    isDisputedApplication: userCase.disputeApplication === YesOrNo.YES,
  };
};
