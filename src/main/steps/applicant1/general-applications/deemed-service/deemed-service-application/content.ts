import config from 'config';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { CommonContent } from '../../../../common/common.content';
import {
  ALTERNATIVE_SERVICE_APPLICATION,
  DEEMED_INTERRUPTION,
  DISPENSE_SERVICE_APPLICATION,
  NEW_POSTAL_AND_EMAIL,
  PARTNER_IN_PRISON,
  SEARCH_GOV_RECORDS_APPLICATION,
} from '../../../../urls';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'You can apply for deemed service',
  line1: `If you have evidence that your ${partner} or their legal representative have received the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }, you could apply for deemed service.`,
  line2: `Your evidence must show that your ${partner} has received the papers, not just that they have been posted to their address.`,
  line3: 'Suitable evidence includes:',
  suitableEvidence: {
    photo: `a photo or screenshot of a message from your ${partner} that shows they have received the papers.`,
    statement: `a statement from your or a third party explaining how your know your ${partner} has received the papers.`,
    message: `a message from us to tell you that your ${partner} has started a response.`,
  },
  line4: `You will be asked to provide the evidence you have to prove that your ${partner} has received the ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }. Without this your application is likely to be rejected.`,
  line5: `The application for deemed service costs £58. You may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  startButton: {
    text: 'Start application',
    url: DEEMED_INTERRUPTION,
  },
  line6: 'You could also try:',
  alsoTry: {
    differentWay: `applying to <a class="govuk-link" href="${ALTERNATIVE_SERVICE_APPLICATION}">have your ${
      isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
    } sent to your ${partner} in a different way</a>.`,
    updateDetails: `<a class="govuk-link" href="${NEW_POSTAL_AND_EMAIL}">updating your ${partner}'s contact details</a> so that the court can send the ${
      isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
    } to their new address.`,
    applyBailiff: `applying to have a <a class="govuk-link" href="${PARTNER_IN_PRISON}"">bailiff or process server serve the papers</a> to your ${partner} in person.`,
    searchRecords: `applying to have the court <a class="govuk-link" href="${SEARCH_GOV_RECORDS_APPLICATION}">search government records</a> for your ${partner}'s contact details if you have no way to contact them.`,
    dispenseService: `applying to <a class="govuk-link" href="${DISPENSE_SERVICE_APPLICATION}">dispense with service</a> if you have done everything you can to find your ${partner}'s details and been unsuccessful.`,
  },
});

// @TODO translations should be verified
const cy = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Gallwch wneud cais am gyflwyno tybiedig',
  line1: `Os oes gennych dystiolaeth bod eich ${partner} neu eu cynrychiolydd cyfreithiol wedi cael papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  }, gallwch wneud cais am gyflwyno tybiedig.`,
  line2: `Mae’n rhaid i’ch tystiolaeth ddangos bod eich ${partner} wedi cael y papurau, nid dim ond eu bod wedi cael eu postio i’w cyfeiriad.`,
  line3: 'Mae tystiolaeth addas yn cynnwys:',
  suitableEvidence: {
    photo: `llun neu sgrinlun o neges gan eich ${partner} sy’n dangos eu bod wedi cael y papurau.`,
    statement: `datganiad gennych chi neu drydydd parti yn egluro sut rydych yn gwybod bod eich ${partner} wedi cael y papurau.`,
    message: `neges gennym ni i ddweud wrthych bod eich ${partner} wedi dechrau eu hymateb.`,
  },
  line4: `Fe ofynnir i chi ddarparu’r dystiolaeth sydd gennych i brofi bod eich ${partner} wedi cael y ${
    isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  }. Heb y dystiolaeth hon, mae’n debyg y bydd eich cais yn cael ei wrthod.`,
  line5: `Mae’r cais am gyflwyno tybiedig yn costio £58. Efallai y gallwch <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">gael help i dalu’r ffi hon (yn agor mewn tab newydd)</a>.`,
  startButton: {
    text: 'Dechrau gwneud y cais',
    url: DEEMED_INTERRUPTION,
  },
  line6: 'Gallwch hefyd geisio:',
  alsoTry: {
    differentWay: `gwneud cais i <a class="govuk-link" href="${ALTERNATIVE_SERVICE_APPLICATION}">bapurau eich ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } gael eu hanfon at eich ${partner} mewn ffordd wahanol</a>.`,
    updateDetails: `<a class="govuk-link" href="${NEW_POSTAL_AND_EMAIL}">diweddaru manylion cyswllt eich ${partner}</a> fel y gall y llys anfon papurau’r ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } i’w cyfeiriad newydd.`,
    applyBailiff: `gwneud cais i <a class="govuk-link" href="${PARTNER_IN_PRISON}"">feili neu weinyddwr proses gyflwyno’r papurau</a> i’ch ${partner} yn bersonol.`,
    searchRecords: `gwneud cais i’r llys <a class="govuk-link" href="${SEARCH_GOV_RECORDS_APPLICATION}">chwilio cofnodion y llywodraeth</a> am fanylion cyswllt eich ${partner} os nad oes gennych ffordd o gysylltu â nhw`,
    dispenseService: `gwneud cais i <a class="govuk-link" href="${DISPENSE_SERVICE_APPLICATION}">hepgor cyflwyno</a> os ydych wedi gwneud popeth y gallwch i ddod o hyd i fanylion eich ${partner} ac wedi bod yn aflwyddiannus`,
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
