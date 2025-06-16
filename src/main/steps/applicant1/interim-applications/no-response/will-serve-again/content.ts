import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE } from '../../../../urls';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'We will send the documents again',
  detailsProvided: `These are the details you previously provided and is where we have sent the ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } papers.`,
  line1: `We will now send the ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } papers to your ${partner} again using the postal address and any email addresses you provided before. The papers will be sent to the address by first class post, and will be sent by email now, if applicable.`,
  whatHappensNext: 'What happens next',
  line2: `Your ${partner} will have ${config.get(
    'dates.interimApplicationNoResponseNewContactDetailsOffsetDays'
  )} days to respond. We will email you if your ${partner} still does not respond. You will then be able to try another way to progress your ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  }.`,
  returnToHubScreen: `<a href=${HUB_PAGE} class="govuk-link">Return to hub screen</a>`,
  errors: {
    applicant1NoResponseCheckContactDetails: {
      required: `You must confirm whether or not your ${partner}'s contact details are correct.`,
    },
  },
});

// @TODO translations should be completed then verified
const cy: typeof en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Mi wnawn anfon y dogfennau eto',
  detailsProvided: `These are the details you previously provided and is where we have sent the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }.`,
  line1: `Byddwn nawr yn anfon papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } at eich ${partner} eto gan ddefnyddio’r cyfeiriad post ac unrhyw gyfeiriadau e-bost a ddarparwyd gennych yn flaenorol. Bydd y papurau’n cael eu hanfon i’r cyfeiriad drwy’r post dosbarth cyntaf, a drwy e-bost nawr, os yw hynny’n berthnasol.`,
  whatHappensNext: 'Beth fydd yn digwydd nesaf',
  line2: `Bydd gan eich ${partner} ${config.get(
    'dates.interimApplicationNoResponseNewContactDetailsOffsetDays'
  )} diwrnod i ymateb. Byddwn yn anfon neges e-bost atoch os na fydd eich ${partner} yn ymateb. Yna byddwch yn gallu ceisio gwneud rhywbeth arall i symud eich ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } yn ei flaen.`,
  returnToHubScreen: `<a href=${HUB_PAGE} class="govuk-link">Dychwelyd i sgrin yr hyb</a>`,
  errors: {
    applicant1NoResponseCheckContactDetails: {
      required: `You must confirm whether or not your ${partner}'s contact details are correct.`,
    },
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
