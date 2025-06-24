import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { CommonContent } from '../../../../common/common.content';
import { EVIDENCE_RECEIVED_APPLICATION, HAVE_THEY_RECEIVED, HAVE_THEY_RECEIVED_REPRESENTED } from '../../../../urls';

const en = ({ isDivorce, partner, isApp2Represented, isApp2Confidential }: CommonContent) => ({
  title: `Options for progressing with ${isDivorce ? 'your divorce' : 'ending your civil partnership'}`,
  line1: `There are a number of ways to progress your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } without a response from your ${partner}.`,
  line2: `The court has sent the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}'s postal address, as well as their email address if your provided one. If you want to progress your ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } in a different way, you will need to apply to the court to do so.`,
  line3: `Depending on the application you make, it could cost either ${getFee(
    config.get('fees.courtBailiffService')
  )} or ${getFee(
    config.get('fees.deemedService')
  )}, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  line4: `We will ask you some questions so that we can show you which options are available to you for proceeding with your ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  }.`,
  line5: `You can <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.legalAdvisor'
  )}">speak to a legal adviser or a solicitor</a> at any point in the application process if you feel you need legal advice.`,
  startButton: {
    text: 'Start now',
    url: () => {
      if (isApp2Represented) {
        return HAVE_THEY_RECEIVED_REPRESENTED;
      }
      return isApp2Confidential ? EVIDENCE_RECEIVED_APPLICATION : HAVE_THEY_RECEIVED;
    },
  },
});

// @TODO translations should be verified
const cy = ({ isDivorce, partner, isApp2Represented, isApp2Confidential }: CommonContent) => ({
  title: `Options for progressing with ${isDivorce ? 'your divorce' : 'ending your civil partnership'}`,
  line1: `Mae yna nifer o ffyrdd i symud eich ${
    isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } ymlaen heb ymateb gan eich ${partner}.`,
  line2: `Mae’r llys wedi anfon papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } i gyfeiriad post eich ${partner}, yn ogystal â’u cyfeiriad e-bost os gwnaethoch ddarparu un. Os ydych chi eisiau symud eich ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } ymlaen mewn ffordd wahanol, bydd angen i chi wneud cais i’r llys.`,
  line3: `Gan ddibynnu ar y cais a wnewch, gall gostio naill ai ${getFee(
    config.get('fees.courtBailiffService')
  )} neu ${getFee(
    config.get('fees.deemedService')
  )}, ond efallai y gallwch <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">gael help i dalu’r ffi hon (yn agor mewn tab newydd)</a>.`,
  line4: `Byddwn yn gofyn cwestiynau i chi fel y gallwn ddangos pa opsiynau sydd ar gael ei chi ar gyfer parhau â’ch ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  }.`,
  line5: '', //INSERT TRANSLATION
  startButton: {
    text: 'Dechrau nawr',
    url: () => {
      if (isApp2Represented) {
        return HAVE_THEY_RECEIVED_REPRESENTED;
      }
      return isApp2Confidential ? EVIDENCE_RECEIVED_APPLICATION : HAVE_THEY_RECEIVED;
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
